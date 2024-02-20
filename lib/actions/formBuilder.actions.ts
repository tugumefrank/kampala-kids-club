"use server";
import { connectToDatabase } from "@/lib/database";
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

  const { name, description } = data;
  console.log(name);
  const form = new Form({
    userId: user.id,
    name,
    description,
  });

  await form.save();

  return form.id;
}
export async function GetForms() {
  await connectToDatabase();
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await Form.find({ userId: user.id }).sort({ createdAt: "desc" });
}

export async function GetFormById(id: string) {
  await connectToDatabase();
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await Form.findOne({
    userId: user.id,
    _id: new Types.ObjectId(id),
  });
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

    return form.content;
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
// export async function CreateForm(data: formSchemaType) {
//   const validation = formSchema.safeParse(data);
//   if (!validation.success) {
//     throw new Error("form not valid");
//   }

//   try {
//     await connectToDatabase();

//     const user = await currentUser();
//     if (!user) {
//       throw new UserNotFoundErr();
//     }

//     const { name, description } = data;

//     const form = await Form?.create({
//       userId: user.id,
//       name,
//       description,
//     });

//     if (!form) {
//       throw new Error("something went wrong");
//     }

//     return form.id;
//   } catch (error) {
//     handleError(error);
//   }
// }

// export async function GetFormStats() {
//   try {
//     await connectToDatabase();

//     const user = await currentUser();
//     if (!user) {
//       throw new UserNotFoundErr();
//     }

//     const form = await Form?.findOne({ userId: user.id });
//     if (!form) {
//       // Handle the case when the form is not found for the user
//       return {
//         visits: 0,
//         submissions: 0,
//         submissionRate: 0,
//         bounceRate: 100,
//       };
//     }
//     console.log(user.id);
//     const stats = await FormSubmissions?.aggregate([
//       {
//         $match: {
//           userId: user.id,
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           visits: { $sum: 1 },
//           submissions: { $sum: 1 },
//         },
//       },
//     ]);
//     console.log(stats);
//     if (!stats) {
//       return;
//     }
//     const { visits, submissions } = stats[0] || { visits: 0, submissions: 0 };

//     let submissionRate = 0;

//     if (visits > 0) {
//       submissionRate = (submissions / visits) * 100;
//     }

//     const bounceRate = 100 - submissionRate;

//     return {
//       visits,
//       submissions,
//       submissionRate,
//       bounceRate,
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }
// export async function GetForms() {
//   try {
//     await connectToDatabase();
//     const user = await currentUser();

//     if (!user) {
//       throw new UserNotFoundErr();
//     }
//     console.log(user.id);
//     // Find forms for the current user and order by createdAt in descending order
//     return await Form?.find({
//       userId: user.id,
//     }).sort({ createdAt: -1 });
//   } catch (error) {
//     // Handle the error, log, or rethrow if needed
//     console.error("Error in GetForms:", error);
//     throw error;
//   }
// }

// export async function GetFormById(id: string) {
//   try {
//     await connectToDatabase();
//     const user = await currentUser();
//     if (!user) {
//       throw new UserNotFoundErr();
//     }

//     // Find a unique form for the current user by id
//     return await Form?.findOne({
//       userId: user.id,
//       _id: id,
//     });
//   } catch (error) {
//     // Handle the error, log, or rethrow if needed
//     console.error("Error in GetFormById:", error);
//     throw error;
//   }
// }
