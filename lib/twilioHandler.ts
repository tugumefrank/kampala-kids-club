export async function sendTwilioMessage(
  phone: string,
  message: string
): Promise<any> {
  try {
    console.log(`Testing: ${process.env.NEXT_PUBLIC_SERVER_URL}api/twilio`);
    console.log(message);

    const twilioResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}api/twilio`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: "+256758973319",
          message: message,
        }),
      }
    );
    console.log(await twilioResponse.text());
    const twilioData = await twilioResponse.json();
    console.log(twilioData);
    return twilioData;
  } catch (twilioError) {
    console.error("Error during Twilio API request:", twilioError);
    throw twilioError; // You might want to handle this error differently based on your requirements
  }
}
