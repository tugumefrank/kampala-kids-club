// import stripe from "stripe";
// import { NextResponse, NextRequest } from "next/server";
// import { createOrder } from "@/lib/actions/order.actions";

// export async function POST(request: Request, response: Response) {
//   const body = await request.text();
//   // my code for flutter

//   const secretHash = process.env.FLW_SECRET_HASH;
//   const signature = request.headers.get("verif-hash") as string;
//   if (!signature || signature !== secretHash) {
//     // This request isn't from Flutterwave; discard
//     return new Response("", { status: 400 });
//   }

//   let eventData;
//   try {
//     eventData = JSON.parse(body);
//     console.log(eventData);
//   } catch (err) {
//     return NextResponse.json({ message: "Webhook error", error: err });
//   }

//   // Get the ID and type
//   const eventStatus = eventData.status;

//   // CREATE
//   if (eventStatus === "successful") {
//     const { id, amount_total, metadata } = eventData.meta;
//     const order = {
//       stripeId: id,
//       eventId: metadata?.eventId || "",
//       buyerId: metadata?.buyerId || "",
//       totalAmount: amount_total ? (amount_total / 100).toString() : "0",
//       createdAt: new Date(),
//     };

//     const newOrder = await createOrder(order);
//     return NextResponse.json({ message: "OK", order: newOrder });
//   }

//   return new Response("", { status: 200 });
// }
import stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";

export async function POST(request: Request, response: Response) {
  const body = await request.text();

  const secretHash = process.env.FLW_SECRET_HASH;
  const signature = request.headers.get("verif-hash") as string;
  if (!signature || signature !== secretHash) {
    // This request isn't from Flutterwave; discard
    return new Response("", { status: 400 });
  }

  let eventData;
  try {
    eventData = JSON.parse(body);
    console.log(eventData);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  const eventStatus = eventData.status;

  // Check if the event is successful
  if (eventStatus === "successful") {
    const { id, amount_total, metadata } = eventData.meta;

    // Make a GET request to Flutterwave API
    const txRef = metadata?.tx_ref || ""; // Replace with the actual key you expect in metadata
    const flutterwaveApiResponse = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${txRef}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer YOUR_FLUTTERWAVE_API_KEY`, // Replace with your Flutterwave API key
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        // You can add more query parameters as needed
      }
    );

    if (flutterwaveApiResponse.ok) {
      const flutterwaveApiResponseData = await flutterwaveApiResponse.json();

      // Process the Flutterwave API response data as needed
      console.log(flutterwaveApiResponseData);
    } else {
      console.error(
        "Failed to fetch Flutterwave API:",
        flutterwaveApiResponse.status,
        flutterwaveApiResponse.statusText
      );
    }

    // Your existing code to create an order
    const order = {
      stripeId: id,
      eventId: metadata?.eventId || "",
      buyerId: metadata?.buyerId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);
    return NextResponse.json({ message: "OK", order: newOrder });
  }

  return new Response("", { status: 200 });
}
