// import { EventEmitter } from "node:events";

// class ApplicationEmitter extends EventEmitter {
//   private clients: Set<ReadableStreamDefaultController>;

//   constructor() {
//     super();
//     this.clients = new Set();
//     this.on("message", this.handleMessage);
//   }

//   addClient(client: ReadableStreamDefaultController) {
//     this.clients.add(client);
//   }

//   removeClient(client: ReadableStreamDefaultController) {
//     this.clients.delete(client);
//   }

//   handleMessage(message: string): void {
//     console.log("Received message:", message);
//     // Convert the clients set to an array and send the message to all connected clients
//     Array.from(this.clients).forEach((client) => {
//       client.enqueue(`data: ${message}\n\n`);
//     });
//   }
// }

// export const app = new ApplicationEmitter();
import { EventEmitter } from "node:events";

class ApplicationEmitter extends EventEmitter {
  private clients: Set<ReadableStreamDefaultController>;
  private messages: string[] = [];

  constructor() {
    super();
    this.clients = new Set();
    this.on("message", this.handleMessage);
  }

  addClient(client: ReadableStreamDefaultController) {
    this.clients.add(client);
    console.log("Client added. Total clients:", this.clients.size);
  }

  removeClient(client: ReadableStreamDefaultController) {
    console.log("Client removed. Total clients:", this.clients.size);
    this.clients.delete(client);
  }

  handleMessage(message: string): void {
    console.log("Received message:", message);
    // Store the message
    this.messages.push(message);
    // Convert the clients set to an array and send the message to all connected clients
    Array.from(this.clients).forEach((client, index) => {
      console.log(`Sending message to client ${index + 1}`);
      try {
        client.enqueue(`data: ${message}\n\n`);
        console.log(`Message sent to client ${index + 1}`);
      } catch (error) {
        console.error(`Failed to send message to client ${index + 1}:`, error);
      }
    });
  }

  getStoredMessages() {
    return this.messages;
  }
}

export const app = new ApplicationEmitter();
