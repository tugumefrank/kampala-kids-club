import React from "react";
import BarCodeGenerator from "../shared/BarCodeGenerator";
import { getOrdersByEvent } from "@/lib/actions/order.actions";
import { IEvent } from "@/lib/database/models/event.model";
type CardProps = {
  data: IEvent[];
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
async function TicketBarcode({ data }: CardProps) {
  const orderedEvents = data;
  console.log(orderedEvents);
  const eventId = "event._id";
  const searchText = "";
  console.log(eventId);
  // const orders = await getOrdersByEvent({ eventId, searchString: searchText });
  // console.log(orders);
  return (
    <>
      <BarCodeGenerator />
    </>
  );
}

export default TicketBarcode;
