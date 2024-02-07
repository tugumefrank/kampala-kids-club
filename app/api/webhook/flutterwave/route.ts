import { NextResponse, NextRequest } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import { createChild } from "@/lib/actions/register.actions";

export async function POST(request: Request, response: Response) {
  const body = await request.text();

  const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;
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
        // Your existing code to create an order
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
  }

  return new Response("wel", { status: 200 });
}
