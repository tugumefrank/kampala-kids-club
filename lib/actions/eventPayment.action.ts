"use server";

interface ChildPaymentDetails {
  mobileNumber: string;
  mobileNetwork: string;
}

interface FlutterwaveResponse {
  flutterwaveResponse: FlutterwaveResponse;
  // Define the expected structure of the Flutterwave API response
  // For example:
  // message: string;
  // status: string;
  // // ... other properties
}

export async function childPayment(order: {
  mobileNumber: string;
  mobileNetwork: string;
  transactionType: string; // Add transactionType to the interface
  childDetails: any;
}): Promise<any> {
  const url = "https://api.flutterwave.com/v3/charges?type=mobile_money_uganda";
  const token = process.env.FLW_SECRET_KEY;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const tx_ref = generateRandomString(10);

    const payload: {
      // Use interface type for payload
      phone_number: string;
      network: string;
      amount: number;
      currency: string;
      email: string;
      tx_ref: string;
      meta: ChildPaymentDetails;
      redirect_url: string;
    } = {
      phone_number: order.mobileNumber,
      network: order.mobileNetwork,
      amount: 500,
      currency: "UGX",
      email: "frankholmez@gmail.com", // Replace with the appropriate email address
      tx_ref: tx_ref,
      meta: order.childDetails,
      redirect_url: `${process.env.PUBLIC_SERVER_URL}/profile`,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    const flutterwaveResponse = await response.json(); // Use interface type for data

    console.log("Response:", flutterwaveResponse);

    return flutterwaveResponse; // Return the response data
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error in payment processing"); // Re-throw error for handling
  }
}

// Function to generate a random alphanumeric string
function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
