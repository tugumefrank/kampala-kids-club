import { Schema, model, models, Document } from "mongoose";

export interface IChildOrder extends Document {
  transactionId: string;
  buyerName?: string;
  buyerImage?: string;
  phoneNumber: string;
  price: string;
  transactionType: string; // e.g., registration, voting, etc.
  createdAt: Date;
}

export type IChildOrderItem = {
  _id: string;
  transactionId: string;
  buyerName?: string;
  buyerImage?: string;
  phoneNumber: string;
  price: string;
  transactionType: string; // e.g., registration, voting, etc.
  createdAt: Date;
};

const ChildOrderSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  buyerName: {
    type: String,
  },
  buyerImage: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChildOrder =
  models.ChildOrder || model<IChildOrder>("ChildOrder", ChildOrderSchema);

export default ChildOrder;
