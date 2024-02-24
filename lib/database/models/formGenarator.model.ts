import mongoose, { Schema, Document, models, model } from "mongoose";
import { v4 as uuid } from "uuid";

const FormSchema = new Schema({
  userId: String,
  createdAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  name: String,
  description: { type: String, default: "" },
  price: { type: String, default: "" },
  isFree: { type: Boolean, default: false },
  formImageUrl: String,
  content: { type: String, default: "[]" },
  visits: { type: Number, default: 0 },
  submissions: { type: Number, default: 0 },
  shareURL: { type: String, unique: true, default: () => uuid() },
  FormSubmissions: [{ type: Schema.Types.Array, ref: "FormSubmissions" }],
});

const FormSubmissionsSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  formId: Number,
  form: { type: Schema.Types.ObjectId, ref: "Form" },
  content: String,
});

const Form = models?.Form || model("Form", FormSchema);
const FormSubmissions =
  models?.FormSubmissions || model("FormSubmissions", FormSubmissionsSchema);

export { Form, FormSubmissions };
// export interface IForm extends Document {
//   userId: string;
//   createdAt: Date;
//   published: boolean;
//   name: string;
//   description: string;
//   content: string;
//   visits: number;
//   submissions: number;
//   shareURL: string;
// }

// export interface IFormSubmissions extends Document {
//   createdAt: Date;
//   formId: Schema.Types.ObjectId; // Change the type to Schema.Types.ObjectId
//   form: IForm;
//   content: string;
// }

// const FormSchema = new Schema<IForm>({
//   userId: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   published: {
//     type: Boolean,
//     default: false,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     default: "",
//   },
//   content: {
//     type: String,
//     default: "[]",
//   },
//   visits: {
//     type: Number,
//     default: 0,
//   },
//   submissions: {
//     type: Number,
//     default: 0,
//   },
//   shareURL: {
//     type: String,
//     unique: true,
//     default: () => uuid(), // Make sure to import 'uuid' library
//   },
// });

// const FormSubmissionsSchema = new Schema<IFormSubmissions>({
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   formId: {
//     type: Schema.Types.ObjectId,
//     ref: "Form",
//     required: true,
//   },
//   form: {
//     type: Schema.Types.ObjectId,
//     ref: "Form",
//   },
//   content: {
//     type: String,
//   },
// });

// let Form: mongoose.Model<IForm> | undefined;
// let FormSubmissions: mongoose.Model<IFormSubmissions> | undefined;

// try {
//   // Try to get the existing model
//   Form = mongoose.model<IForm>("Form");
//   FormSubmissions = mongoose.model<IFormSubmissions>("FormSubmissions");
// } catch {
//   // If the model doesn't exist, create a new one
//   Form = model<IForm>("Form", FormSchema);
//   FormSubmissions = model<IFormSubmissions>(
//     "FormSubmissions",
//     FormSubmissionsSchema
//   );
// }
// // const Form = models.Form || model<IForm>("Form", FormSchema);
// // const FormSubmissions =
// //   models.FormSubmissions ||
// //   model<IFormSubmissions>("FormSubmissions", FormSubmissionsSchema);
// export { Form, FormSubmissions };
