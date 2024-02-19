// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export const connectToDatabase = async () => {
//   if (cached.conn) return cached.conn;

//   if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

//   cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//     dbName: 'evently',
//     bufferCommands: false,
//   })

//   cached.conn = await cached.promise;

//   return cached.conn;
// }

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cachedConnection: any;

export const connectToDatabase = async () => {
  if (cachedConnection) return cachedConnection;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  try {
    cachedConnection = await mongoose.connect(MONGODB_URI, {
      bufferCommands: true, // Adjust if needed
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }

  return cachedConnection;
};
