import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});

export const childFormSchema = z.object({
  childName: z.string().min(3, "Child's Name must be at least 3 characters"),
  // childAge: z.number(),
  school: z.string().min(3, "School must be at least 3 characters"),
  class: z.string().min(1, "Class must be at least 1 character"),
  nationality: z.string().min(3, "Nationality must be at least 3 characters"),
  residentialAddress: z
    .string()
    .min(3, "Residential Address must be at least 3 characters"),
  childPhotoUrl: z.string(),
  parentGuardianName: z
    .string()
    .min(3, "Parent/Guardian Name must be at least 3 characters"),
  parentGuardianContact: z
    .string()
    .min(7, "Parent/Guardian Contact must be at least 7 characters"),
  whatsappNumber: z
    .string()
    .min(10, "Whatsapp number must be at least 7 characters"),
  placeOfWork: z.string().min(3, "Place of work must be at least 3 characters"),
  relationshipWithApplicant: z
    .string()
    .min(3, "Relationship with the applicant must be at least 3 characters"),
  parentIDUrl: z.string(),
  healthyStatus: z
    .string()
    .min(3, "Healthy status must be at least 3 characters"),
  nextOfKinContact: z
    .string()
    .min(3, "Next of kin's contact must be at least 3 characters"),
  // termsAndConditions: z.boolean().refine((value) => value === true, {
  //   message: "You must agree to the terms and conditions",
  // }),
  // paymentAgreement: z.boolean().refine((value) => value === true, {
  //   message: "You must agree to the payment agreement",
  // }),
});
