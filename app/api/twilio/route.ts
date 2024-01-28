import { NextResponse, NextRequest } from "next/server";

import twilio from "twilio";

export async function POST(req: Request, res: Response) {
  const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
  const token = <string>process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const body = await req.text();
  const twilioData = JSON.parse(body);
  console.log(twilioData.message);
  // const [phone, message] = twilioData;
  try {
    const twilioMessage = await client.messages.create({
      body: twilioData.message,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+256709738858",
    });
    return NextResponse.json({ message: twilioMessage });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Webhook error", error: error });
  }
}
