import React from "react";
import Image from "next/image";
const Ticket = () => {
  return (
    <div className="px-4 py-2 text-gray-800">
      <div className="hidden xl:flex flex-row justify-between shadow-md border rounded-md">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-between w-1/4 px-4 py-2 bg-white border-r-2 border-gray-500 border-dashed rounded-l-md">
          {/* Left Top Section */}
          <div className="flex-col">
            <img
              src="https://store-images.s-microsoft.com/image/apps.33967.13510798887182917.246b0a3d-c3cc-46fc-9cea-021069d15c09.392bf5f5-ade4-4b36-aa63-bb15d5c3817a"
              alt="QR Code"
            />

            <div className="text-xs mb-2 text-gray-600">
              <span className="text-gray-500">Valid until :</span>
              <br />
              Monday, 28 September 2020 18:30:23
            </div>
          </div>
          {/* Left Bottom Section */}
          <div className="text-left">
            <p className="pb-2 text-xs italic">Powered By</p>
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={128}
              height={38}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex flex-col w-3/4">
          <img
            src="https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png"
            alt="Event Image"
          />
          <div className="absolute p-1 bottom-24">
            <div className="flex flex-row px-4 py-2 text-xs font-bold text-red-800 bg-white rounded-md ">
              <span className="mr-2 font-normal text-gray-500">
                Organizer :
              </span>
              <p className="font-semibold text-red-800">Banua Coder</p>
            </div>
          </div>
          <div className="absolute self-end mr-1 mt-1">
            <p className="px-4 py-2 text-xs font-bold text-red-800 bg-white rounded-md ">
              <span className="font-normal text-gray-500">Ticket Number :</span>
              12
            </p>
          </div>
          <div className="absolute bottom-0 flex flex-col w-full h-24">
            <div className="w-full h-full bg-white opacity-75 rounded-br-md"></div>
            <div className="absolute flex flex-row p-2 text-gray-800 opacity-100">
              {/* Event Details */}
              {/* ... (Omitted for brevity) ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
