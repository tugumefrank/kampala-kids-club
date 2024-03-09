import React from "react";
import Image from "next/image";
import TicketEventDetails from "./TicketEventDetails";
import { IEvent } from "@/lib/database/models/event.model";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
function TicketHeroSection({ event, hasOrderLink, hidePrice }: CardProps) {
  return (
    <div className="group relative flex min-h-[380px] w-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Image
        src={event.imageUrl}
        alt="event_image"
        fill
        style={{ objectFit: "cover" }}
        className="object-contain rounded-lg"
      />
      <div className="absolute self-start ml-1 mt-2">
        <div className="">
          <span className="hidden p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60 ">
            ugx 1000000
          </span>
        </div>
      </div>
      <div className="absolute self-end mr-1 mt-1">
        <p className="px-4 py-2 text-xs font-bold  text-primary bg-white rounded-md ">
          <span className="font-normal text-gray-500">Ticket No.</span>
          12
        </p>
      </div>
      <TicketEventDetails event={event} />
    </div>
  );
}

export default TicketHeroSection;
