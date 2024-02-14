import { NextRequest, NextResponse } from "next/server";
let url: string = "";
async function handler(req: NextRequest, res: NextResponse) {
  // ... (Existing SSE setup)

  if (req.method === "POST") {
    try {
      // Read the POST body as text:
      const message = await req.text();
      console.log("Received message:", message);

      // Extract data from the SSE message format:
      const data = JSON.parse(message.split("\n\n")[0].substring(5));
      console.log(data);
      // Access the received URL from the data object:
      console.log(url);
      url = data.data.urlPassed;
      console.log(url);

      // Handle the received data and URL (e.g., update UI, trigger new SSE messages)
      console.log("Received SSE data:", data, "URL:", url);
      // ... (Your logic based on data and URL)
    } catch (error) {
      console.error("Error receiving SSE data:", error);
    }
    return NextResponse.json({ message: "OK", urlPassed: url });
  }
  console.log(url);
  if (req.method === "GET") {
    console.log(url);
    if (url) {
      return new Response(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response("no url set", { status: 400 });
    }
  }
}
export { handler as GET, handler as POST };
