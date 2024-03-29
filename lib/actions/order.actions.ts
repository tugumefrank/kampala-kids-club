"use server";

import {
  CheckoutOrderParams,
  EventOrderParams,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
} from "@/types";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import EventOrders from "../database/models/order.model";
import Event from "../database/models/event.model";
import { ObjectId } from "mongodb";
import User from "../database/models/user.model";
import { Schema } from "mongoose";
// const Flutterwave = require("flutterwave-node-v3");

export const checkoutOrder = async (order: CheckoutOrderParams) => {
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

export const createEventOrder = async (order: EventOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await EventOrders.create({
      ...order,
      event: order.eventId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

// GET ORDERS BY EVENT

export async function getOrdersByEvent({
  searchString,
  eventId,
}: GetOrdersByEventParams) {
  try {
    await connectToDatabase();

    if (!eventId) throw new Error("Event ID is required");

    const orders = await EventOrders.aggregate([
      {
        $match: {
          eventId: eventId,
          buyerNumber: { $regex: RegExp(searchString, "i") },
        },
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          transactionId: 1,
          paymentStatus: 1,
          eventId: 1,
          buyerNumber: 1,
          transactionType: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
}
// export async function getOrdersByEvent({
//   searchString,
//   eventId,
// }: GetOrdersByEventParams) {
//   try {
//     await connectToDatabase();

//     if (!eventId) throw new Error("Event ID is required");
//     const eventObjectId = new ObjectId(eventId);

//     const orders = await EventOrders.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "buyer",
//           foreignField: "_id",
//           as: "buyer",
//         },
//       },
//       {
//         $unwind: "$buyer",
//       },
//       {
//         $lookup: {
//           from: "events",
//           localField: "event",
//           foreignField: "_id",
//           as: "event",
//         },
//       },
//       {
//         $unwind: "$event",
//       },
//       {
//         $project: {
//           _id: 1,
//           totalAmount: 1,
//           createdAt: 1,
//           eventTitle: "$event.title",
//           eventId: "$event._id",
//           buyer: {
//             $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
//           },
//         },
//       },
//       {
//         $match: {
//           $and: [
//             { eventId: eventObjectId },
//             { buyer: { $regex: RegExp(searchString, "i") } },
//           ],
//         },
//       },
//     ]);

//     return JSON.parse(JSON.stringify(orders));
//   } catch (error) {
//     console.log(error);
//     handleError(error);
//   }
// }

// GET ORDERS BY USER
export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await EventOrders.distinct("event._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: Event,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const ordersCount = await EventOrders.distinct("event._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export const getEventNameByEventId = async (eventId: any) => {
  try {
    await connectToDatabase();

    if (!eventId) throw new Error("Event ID is required");

    const eventObjectId = new ObjectId(eventId);

    const event = await Event.findById(eventObjectId);

    if (!event) throw new Error("Event not found");

    return event.title;
  } catch (error) {
    console.error("Error fetching event name: ", error);
    throw error;
  }
};
