"use server";

import { connectToDatabase } from "@/lib/database";
import { childFormSchema } from "@/lib/validator";
import Child from "@/lib/database/models/register.model";
import { handleError } from "@/lib/utils";
import * as z from "zod";

// CREATE CHILD
export async function createChild(
  childDetails: z.infer<typeof childFormSchema>
) {
  try {
    await connectToDatabase();

    const newChild = await Child.create(childDetails);

    return JSON.parse(JSON.stringify(newChild));
  } catch (error) {
    handleError(error);
  }
}

type ChildPaymentParama = {
  mobileNumber: string;
  mobileNetwork: string;
};

//CHILD PAYMENT ACTION
export const ChildPayment = async (order: ChildPaymentParama) => {
  console.log(`${process.env.NODE_PUBLIC_SERVER_URL}users/create`);
  console.log(order);
  try {
    const res = await fetch(
      `${process.env.NODE_PUBLIC_SERVER_URL}users/create`,
      {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return { message: "internal server error" };
  }
};
