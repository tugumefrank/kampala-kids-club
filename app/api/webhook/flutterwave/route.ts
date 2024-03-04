import { NextResponse, NextRequest } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import { createChild } from "@/lib/actions/register.actions";
import { sendTwilioMessage } from "@/lib/twilioHandler";

import { createChildOrder } from "@/lib/actions/ChildOrder.actions";

export async function POST(request: Request, response: Response) {
  const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;
  const body = await request.text();

  const secretHash = process.env.FLW_SECRET_HASH;
  const signature = request.headers.get("verif-hash") as string;
  if (!signature || signature !== secretHash) {
    // This request isn't from Flutterwave; discard
    return new Response("not authorised", { status: 400 });
  }

  let flutterWebhookResponse;
  try {
    flutterWebhookResponse = JSON.parse(body);
    console.log(flutterWebhookResponse);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  const eventStatus = flutterWebhookResponse.data.status;
  console.log(eventStatus);
  // Check if the event is successful
  if (eventStatus === "successful") {
    const { id, amount, tx_ref } = flutterWebhookResponse.data;
    console.log(tx_ref);
    // Make a GET request to Flutterwave API
    // const txRef = metadata?.txRef || ""; // Replace with the actual key you expect in metadata
    const transactionData = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${flutterwaveSecretKey}`, // Replace with your Flutterwave API key
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        // You can add more query parameters as needed
      }
    );

    if (transactionData.ok) {
      const transactionDetails = await transactionData.json();

      console.log(transactionDetails);
      const { eventId, childName } = transactionDetails.data.meta;
      if (eventId) {
        // checks if the webhook has an eventID to create order for event
        const order = {
          stripeId: transactionDetails.data.flw_ref,
          eventId: eventId,
          buyerId: transactionDetails.data.meta.buyerId,
          totalAmount: amount ? amount.toString() : "0",
          createdAt: new Date(),
        };

        const newOrder = await createOrder(order);

        return NextResponse.json({ message: "OK", order: newOrder });
      } else if (childName) {
        // create ChildOrder in the database
        const Order = {
          paymentStatus: transactionDetails.status,
          transactionId: transactionDetails.data.flw_ref,
          buyerName: transactionDetails.data.meta.parentGuardianName,
          buyerImage: transactionDetails.data.meta.childPhotoUrl,
          phoneNumber: transactionDetails.data.customer.phone_number,
          price: transactionDetails.data.amount,
          transactionType: transactionDetails.data.meta.transactionType,
          createdAt: new Date(),
        };
        console.log(Order);
        const newChildOrder = await createChildOrder(Order);
        if (newChildOrder) {
          fetch(`${process.env.NODE_PUBLIC_SERVER_URL}message`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: newChildOrder }),
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => {
              console.error("Error:", error);
            });
        }

        // Call the Twilio API to send a WhatsApp message
        // Construct a meaningful message for Twilio WhatsApp
        const twilioMessage = `
    form submitted
        `;

        // Call the Twilio API to send a WhatsApp message using the handler
        try {
          await sendTwilioMessage("+256758973319", twilioMessage);
        } catch (twilioError) {
          console.error(
            "Error during Twilio API request in main route:",
            twilioError
          );
          // Handle Twilio API error from main route
          return NextResponse.json({
            message: "Twilio API error",
          });
        }

        return NextResponse.json({ message: "OK", order: newChildOrder });
      }
    } else {
      console.error(
        "Failed to fetch Flutterwave API:",
        transactionData.status,
        transactionData.statusText
      );
      return new Response("invalid  ref", { status: 400 });
    }
  } else {
    console.log(flutterWebhookResponse.data.status);
    console.log(flutterWebhookResponse.data.message);
  }

  return new Response("wel", { status: 200 });
}
