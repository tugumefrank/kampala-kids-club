import React from "react";
import toast, { Toaster } from "react-hot-toast";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col bg-[EDEBF2]">
      <main className="flex-1">{children}</main>
      <Toaster position="top-center" />
    </div>
  );
};

export default layout;
