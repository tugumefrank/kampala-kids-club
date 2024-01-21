import { Document, Schema, model, models } from "mongoose";

export interface IChild extends Document {
  childName: string;
  childAge: number;
  school?: string;
  class?: string;
  nationality?: string;
  residentialAddress?: string;
  childPhotoUrl?: string;
  parentGuardianName?: string;
  parentGuardianContact?: string;
  whatsappNumber?: string;
  placeOfWork?: string;
  relationshipWithApplicant?: string;
  parentIDUrl?: string;
  healthyStatus?: string;
  nextOfKinContact?: string;
}

const ChildSchema = new Schema({
  childName: { type: String, required: true },
  childAge: { type: Number, required: true },
  school: { type: String },
  class: { type: String },
  nationality: { type: String },
  residentialAddress: { type: String },
  childPhotoUrl: { type: String },
  parentGuardianName: { type: String },
  parentGuardianContact: { type: String },
  whatsappNumber: { type: String },
  placeOfWork: { type: String },
  relationshipWithApplicant: { type: String },
  parentIDUrl: { type: String },
  healthyStatus: { type: String },
  nextOfKinContact: { type: String },
});

const Child = models.Child || model<IChild>("Child", ChildSchema);

export default Child;
