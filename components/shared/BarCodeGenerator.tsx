"use client";
import React from "react";
import QRCode from "qrcode.react";
import Image from "next/image";
const url = "https://example.com";

const BarCodeGenerator = () => {
  const qrCode = (
    <QRCode
      id="qrCodeElToRender"
      size={100}
      value={url}
      bgColor="white"
      fgColor="#141926"
      level="H"
      // imageSettings={{
      //   src: icon,
      //   excavate: false,
      //   width: 500 * 0.1,
      //   height: 500 * 0.1,
      // }}
    />
  );
  return (
    <div className="flex flex-col items-center justify-between w-full md:w-1/4 px-4 py-2 bg-white border-r-2 border-gray-500 border-dashed rounded-l-md">
      {/* Left Top Section */}
      <div className="flex-col">
        {qrCode}
        <div className="text-xs mt-4 text-gray-600">
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
  );
};

export default BarCodeGenerator;
