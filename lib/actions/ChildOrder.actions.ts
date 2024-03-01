import {
  CheckoutChildOrderParams,
  CreateChildOrderParams,
  GetChildOrdersByTransactionTypeParams,
} from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import ChildOrder from "../database/models/ChildOrder.model";

export const checkoutChildOrder = async (order: CheckoutChildOrderParams) => {
  try {
    const res = await fetch(`${process.env.NODE_PUBLIC_SERVER_URL}users/test`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return { message: "internal server error" };
  }
};

export const createChildOrder = async (order: CreateChildOrderParams) => {
  try {
    await connectToDatabase();

    const newChildOrder = await ChildOrder.create({
      ...order,
    });

    return JSON.parse(JSON.stringify(newChildOrder));
  } catch (error) {
    handleError(error);
  }
};

// get child orders by name search or transactiontype and limit
export async function getChildOrders({
  searchString,
  transactionType,
  limit,
}: GetChildOrdersByTransactionTypeParams & { limit?: number }) {
  try {
    await connectToDatabase();

    const pipeline: any[] = [
      {
        $project: {
          _id: 1,
          transactionId: 1,
          buyerName: 1,
          buyerImage: 1,
          phoneNumber: 1,
          transactionType: 1,
          price: 1,
          createdAt: 1,
        },
      },
      {
        $match: {
          $and: [
            { transactionType: { $regex: RegExp(transactionType, "i") } },
            { buyerName: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ];

    // Add the $sort stage only if limit is provided
    if (limit) {
      pipeline.push(
        {
          $sort: { createdAt: -1 },
        },
        {
          $limit: limit,
        }
      );
    }

    const childOrders = await ChildOrder.aggregate(pipeline);

    return JSON.parse(JSON.stringify(childOrders));
  } catch (error) {
    handleError(error);
  }
}
//get the total sum of all orders and by transactionType
export async function getTotalAmount(transactionType?: string) {
  try {
    await connectToDatabase();

    const aggregationPipeline = [];

    if (transactionType) {
      aggregationPipeline.push({
        $match: {
          transactionType: { $regex: RegExp(transactionType, "i") },
        },
      });
    }

    aggregationPipeline.push({
      $group: {
        _id: null,
        totalAmount: { $sum: { $toDouble: "$price" } }, // Use $toDouble to ensure the price is treated as a numeric value
      },
    });

    const totalAmountResult = await ChildOrder.aggregate(aggregationPipeline);

    const totalAmount =
      totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;

    console.log("Total Amount Result:", totalAmountResult);
    console.log("Total Amount:", totalAmount);

    return totalAmount;
  } catch (error) {
    console.error("Error calculating total amount: ", error);
    throw error;
  }
}
