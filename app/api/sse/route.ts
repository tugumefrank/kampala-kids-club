import { app } from "@/lib/application";
import { TextEncoder } from "util";

export function GET(request: Request) {
  console.log("Client connected");
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  // Send stored events to the client
  // Add a listener for the 'message' event
  const messageListener = (message: any) => {
    console.log("Message event received");
    console.log(message);
    // Send the message to the client
    writer.write(encoder.encode(`data: ${message}\n\n`));
  };
  app.on("message", messageListener);

  // When the client disconnects, close the writer and remove the event listener
  request.signal.addEventListener("abort", () => {
    writer.close();
    app.off("message", messageListener);
  });

  // Return the stream response and keep the connection alive
  return new Response(responseStream.readable, {
    // Set the headers for Server-Sent Events (SSE)
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
      "Content-Encoding": "none",
    },
  });
}
