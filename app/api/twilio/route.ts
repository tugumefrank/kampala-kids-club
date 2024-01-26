import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
  const token = <string>process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const { phone, message } = req.body;
  console.log(phone, message);
  client.messages
    .create({
      body: "frankholmez@gmail.com",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+256709738858",
    })
    .then((message) => console.log(message.sid));

  // .then((message) =>
  //   res.json({
  //     success: true,
  //     message,
  //   })
  // )
  // .catch((error) => {
  //   console.log(error);
  //   res.json({
  //     success: false,
  //   });
  // });
}
