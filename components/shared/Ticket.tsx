import React from "react";
import Image from "next/image";
import { IEvent } from "@/lib/database/models/event.model";
import TicketBarcode from "./TicketBarcode";
import TicketHeroSection from "./TicketHeroSection";
import Pagination from "./Pagination";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};
const Ticket = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  console.log(data);
  return (
    // <div className="px-4 py-2 text-gray-800">
    //   <div className=" relative flex flex-col-reverse md:flex-row justify-between shadow-md border rounded-md bg-white">
    //     <TicketBarcode />
    //     <TicketHeroSection />
    //   </div>
    // </div>

    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:gap-10 ">
            {data.map((event) => {
              //   const hasOrderLink = collectionType === "Events_Organized";
              //   const hidePrice = collectionType === "My_Tickets";

              return (
                <li
                  key={event._id}
                  className="flex justify-center border-2 border-dashed rounded"
                >
                  <TicketBarcode data={data} />
                  <TicketHeroSection
                    event={event}
                    // hasOrderLink={hasOrderLink}
                    // hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Ticket;
