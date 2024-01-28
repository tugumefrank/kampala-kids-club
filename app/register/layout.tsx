import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { MobileProvider } from "@/context/paymentContext";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MobileProvider>
      <div className="flex h-screen flex-col bg-[EDEBF2]">
        <main className="flex-1">{children}</main>
        <Toaster
          containerStyle={{ top: 200 }}
          toastOptions={{ position: "top-center" }}
        />
      </div>
    </MobileProvider>
  );
};

export default layout;
