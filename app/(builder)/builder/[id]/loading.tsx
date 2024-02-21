import React from "react";
import { ImSpinner2 } from "react-icons/im";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#E2E8F0] dark:bg-zinc-900 ">
      <ImSpinner2 className="animate-spin h-12 w-12 text-primary" />
    </div>
  );
}

export default Loading;
