import { NextResponse, NextRequest } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import { createChild } from "@/lib/actions/register.actions";
import { sendTwilioMessage } from "@/lib/twilioHandler";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createChildOrder } from "@/lib/actions/ChildOrder.actions";
import { Console } from "console";

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
        console.log(newChildOrder);
        // Logic for processing child registration
        const {
          childName,
          childAge,
          school,
          class: className,
          nationality,
          residentialAddress,
          childPhotoUrl,
          parentGuardianName,
          parentGuardianContact,
          whatsappNumber,
          placeOfWork,
          relationshipWithApplicant,
          parentIDUrl,
          healthyStatus,
          nextOfKinContact,
        } = transactionDetails.data.meta;
        const childDetails = {
          childName,
          childAge,
          school,
          class: className,
          nationality,
          residentialAddress,
          childPhotoUrl,
          parentGuardianName,
          parentGuardianContact,
          whatsappNumber,
          placeOfWork,
          relationshipWithApplicant,
          parentIDUrl,
          healthyStatus,
          nextOfKinContact,
        };

        const newChild = await createChild(childDetails);

        if (newChild) {
          const sseData = { data: { urlPassed: "/dashboard" } };
          const sseMessage = `data: ${JSON.stringify(sseData)}`;
          console.log(sseMessage);
          const url = `${process.env.NEXT_PUBLIC_SERVER_URL}api/sse`; // Your SSE endpoint URL
          console.log(url);
          try {
            const response = await fetch(url, {
              method: "POST",
              body: sseMessage,
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              console.error("SSE message failed to send:", response.statusText);
            }
          } catch (error) {
            console.error("Error sending SSE message:", error);
          }
        } else {
          return NextResponse.json({
            message: "Order creation failed",
            order: null,
          });
        }

        // Call the Twilio API to send a WhatsApp message
        // Construct a meaningful message for Twilio WhatsApp
        const twilioMessage = `
          Payment for ${childName}'s registration has been successful!
          Child Details:
          - Age: ${childAge}
          - School: ${school}
          - Class: ${className}
          - Nationality: ${nationality}
          - Residential Address: ${residentialAddress}
          - Parent/Guardian Name: ${parentGuardianName}
          - Parent/Guardian Contact: ${parentGuardianContact}
          - WhatsApp Number: ${whatsappNumber}
          - Place of Work: ${placeOfWork}
          - Relationship with Applicant: ${relationshipWithApplicant}
          - Parent ID or Passport: ${parentIDUrl}
          - Healthy Status: ${healthyStatus}
          - Next of Kin's Contact: ${nextOfKinContact}
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

        return NextResponse.json({ message: "OK", child: newChild });
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
