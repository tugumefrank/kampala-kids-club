import React from "react";
import Collection from "@/components/shared/Collection";
import Ticket from "@/components/shared/Ticket";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const page = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapperform flex items-center justify-center ">
          <h3 className="h3-bold text-center sm:text-left">
            Little Miss Wildlife - 2024
          </h3>
        </div>
      </section>
      <section className="wrapperform my-1 bg-green-400"></section>
    </>
  );
};
export default page;
