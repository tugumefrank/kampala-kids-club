import React from "react";
import { IEvent } from "@/lib/database/models/event.model";
import Search from "@/components/shared/Search";
import { getOrdersByEvent } from "@/lib/actions/order.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { IOrderItem } from "@/lib/database/models/order.model";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

async function TicketEventDetails({
  event,
  hasOrderLink,
  hidePrice,
}: CardProps) {
  const eventId = event._id;
  const searchText = "";
  console.log(event);
  const orders = await getOrdersByEvent({
    eventId,
    searchString: searchText,
  });
  console.log(orders);
  return (
    <div className="absolute bottom-0 flex flex-col w-full h-24">
      <div className=" w-full h-full justify-between bg-white opacity-75 rounded-br-md"></div>
      <div className="absolute flex flex-row w-full p-2 justify-evenly text-black opacity-100">
        {/* Event Details */}
        <div className="flex flex-col">
          <div className="flex flex-col">
            <p className="mb-1 text-xs text-gray-500">Start Date :</p>
            <p className="text-xs font-semibold text-primary">
              {" "}
              {formatDateTime(event.startDateTime).dateTime}
            </p>
          </div>
        </div>
        <div className="flex flex-col ml-4">
          <div className="flex flex-col mt-1">
            <p className="mb-1 text-xs text-gray-500">Location :</p>
            <p className="text-xs font-semibold text-primary">
              {event.location}
            </p>
          </div>
        </div>
        <div className="flex flex-col ml-4">
          <div className="flex flex-col">
            <p className="mb-1 text-xs text-gray-500">Ticket Owner :</p>
            <p className="text-xs font-semibold text-primary">Tugume Frank</p>
          </div>
        </div>
        {/* Event Details end*/}
      </div>
    </div>
  );
}

export default TicketEventDetails;
