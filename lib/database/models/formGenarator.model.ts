import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuid } from "uuid";

export interface IForm extends Document {
  userId: string;
  createdAt: Date;
  published: boolean;
  name: string;
  description: string;
  content: string;
  visits: number;
  submissions: number;
  shareURL: string;
}

export interface IFormSubmissions extends Document {
  createdAt: Date;
  formId: number;
  form: IForm;
  content: string;
}

const FormSchema = new Schema<IForm>({
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "[]",
  },
  visits: {
    type: Number,
    default: 0,
  },
  submissions: {
    type: Number,
    default: 0,
  },
  shareURL: {
    type: String,
    unique: true,
    default: () => uuid(), // Make sure to import 'uuid' library
  },
});

const FormSubmissionsSchema = new Schema<IFormSubmissions>({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  formId: {
    type: Number,
    required: true,
  },
  form: {
    type: Schema.Types.ObjectId,
    ref: "Form",
  },
  content: {
    type: String,
  },
});

const Form = mongoose.model<IForm>("Form", FormSchema);
const FormSubmissions = mongoose.model<IFormSubmissions>(
  "FormSubmissions",
  FormSubmissionsSchema
);

export { Form, FormSubmissions };
