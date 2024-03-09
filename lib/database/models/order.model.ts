// import { Schema, model, models, Document } from "mongoose";

// export interface IOrder extends Document {
//   createdAt: Date;
//   stripeId: string;
//   totalAmount: string;
//   event: {
//     _id: string;
//     title: string;
//   };
//   buyer: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//   };
// }

// export type IOrderItem = {
//   _id: string;
//   totalAmount: string;
//   createdAt: Date;
//   eventTitle: string;
//   eventId: string;
//   buyer: string;
// };

// const OrderSchema = new Schema({
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   stripeId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   totalAmount: {
//     type: String,
//   },
//   event: {
//     type: Schema.Types.ObjectId,
//     ref: "Event",
//   },
//   buyer: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// const Order = models.Order || model("Order", OrderSchema);

// export default Order;

import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
  createdAt: Date;
  transactionId: string;
  paymentStatus: string;
  eventId: string;
  buyerNumber: string;
  totalAmount: string;
  transactionType: string;
}

export type IOrderItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  transactionId: string;
  paymentStatus: string;
  eventId: string;
  buyerNumber: string;
  transactionType: string;
};

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  buyerNumber: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
});

const EventOrders = models.EventOrders || model("EventOrders", OrderSchema);

export default EventOrders;
