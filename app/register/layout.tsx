import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col bg-[EDEBF2]">
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default layout;
