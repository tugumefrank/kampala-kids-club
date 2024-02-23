"use server";
import { connectToDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";
import {
  Form,
  FormSubmissions,
} from "@/lib/database/models/formGenarator.model";
import { handleError } from "@/lib/utils";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";
import { Schema } from "mongoose";
import { Types } from "mongoose";

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
  await connectToDatabase();
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }
  console.log(user.id);
  const stats = await Form.aggregate([
    { $match: { userId: user.id } },
    {
      $group: {
        _id: null,
        visits: { $sum: "$visits" },
        submissions: { $sum: "$submissions" },
      },
    },
  ]);

  const visits = stats[0]?.visits || 0;
  const submissions = stats[0]?.submissions || 0;

  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}
export async function CreateForm(data: formSchemaType) {
  await connectToDatabase();

  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Form not valid");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const { name, description, formImageUrl } = data;
  console.log(formImageUrl);
  const form = new Form({
    userId: user.id,
    name,
    description,
    formImageUrl,
  });

  await form.save();

  return form.id;
}

export async function GetForms({ query }: { query?: string } = {}) {
  try {
    await connectToDatabase();
    const user = await currentUser();

    if (!user) {
      throw new UserNotFoundErr();
    }

    const titleCondition = query
      ? { name: { $regex: query, $options: "i" } }
      : {};

    const conditions = {
      $and: [{ userId: user.id }, titleCondition],
    };

    return await Form.find(conditions).sort({ createdAt: "desc" }).lean();
  } catch (error) {
    handleError(error);
  }
}

export async function GetFormById(id: string) {
  await connectToDatabase();
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  const selectedFields = {
    userId: 1,
    published: 1,
    name: 1,
    description: 1,
    content: 1,
    visits: 1,
    submissions: 1,
    FormSubmissions: 1,
    createdAt: 1,
    shareURL: 1,
    formImageUrl: 1,
  };
  return await Form.findOne(
    {
      userId: user.id,
      _id: new Types.ObjectId(id),
    },
    selectedFields
  ).lean();
}

export async function UpdateFormContent(id: string, jsonContent: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  try {
    await connectToDatabase();
    const form = await Form.findOneAndUpdate(
      { userId: user.id, _id: id },
      { content: jsonContent },
      { new: true } // Return the updated document
    );

    if (!form) {
      throw new Error("Form not found");
    }

    return form;
  } catch (error) {
    // Handle any errors (e.g., database connection issues, validation errors)
    throw new Error("Error updating form content");
  }
}
export async function PublishForm(id: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  try {
    await connectToDatabase();
    const form = await Form.findOneAndUpdate(
      { userId: user.id, _id: id },
      { published: true },
      { new: true }
    );

    if (!form) {
      throw new Error("Form not found");
    }

    return form;
  } catch (error) {
    throw new Error("Error publishing form");
  }
}

export async function GetFormContentByUrl(formUrl: string) {
  try {
    await connectToDatabase();
    const form = await Form.findOneAndUpdate(
      { shareURL: formUrl },
      { $inc: { visits: 1 } },
      { new: true }
    );

    if (!form) {
      throw new Error("Form not found");
    }

    const { content, formImageUrl } = form;
    return { content, formImageUrl };
  } catch (error) {
    throw new Error("Error fetching form content");
  }
}
export async function SubmitForm(formUrl: string, content: string) {
  console.log(formUrl, content);
  try {
    await connectToDatabase();
    const form = await Form.findOneAndUpdate(
      { shareURL: formUrl, published: true },
      {
        $inc: { submissions: 1 },
        $push: { FormSubmissions: { content, submittedAt: new Date() } },
      },
      { new: true }
    );
    console.log(form);

    if (!form) {
      throw new Error("Form not found or not published");
    }

    return form;
  } catch (error) {
    console.log(error);
    throw new Error("Error submitting form");
  }
}

export async function GetFormWithSubmissions(id: string) {
  try {
    await connectToDatabase();
    const user = await currentUser();

    if (!user) {
      throw new UserNotFoundErr();
    }

    const formWithSubmissions = await Form.findOne({
      userId: user.id,
      _id: id,
    }).populate("FormSubmissions");

    return formWithSubmissions;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error in GetFormWithSubmissions:", error);
    throw error;
  }
}

export async function deleteFormById({
  formId,
  path,
}: {
  formId: string;
  path: string;
}) {
  try {
    await connectToDatabase();

    // Delete form submissions associated with the form
    await FormSubmissions.deleteMany({ form: formId });

    // Delete the form

    const deletedForm = await Form.findByIdAndDelete(formId);
    if (deletedForm) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function updateFormPublishedStatus(formId: String) {
  try {
    await connectToDatabase();

    // Find the form by ID and set published to false
    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      { published: false },
      { new: true } // Return the updated document
    );

    return updatedForm;
  } catch (error) {
    // Handle any errors
    console.error("Error updating form published status:", error);
    throw error;
  }
}
