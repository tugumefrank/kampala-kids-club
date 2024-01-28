"use client";
import { createContext, useContext, ReactNode, useState } from "react";

type MobileContextType = {
  mobileNumber: string;
  mobileNetwork: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  setMobileNetwork: React.Dispatch<React.SetStateAction<string>>;
};

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export const MobileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [mobileNetwork, setMobileNetwork] = useState<string>("");

  return (
    <MobileContext.Provider
      value={{ mobileNumber, mobileNetwork, setMobileNumber, setMobileNetwork }}
    >
      {children}
    </MobileContext.Provider>
  );
};

export const useMobileContext = () => {
  const context = useContext(MobileContext);
  if (!context) {
    throw new Error("useMobileContext must be used within a MobileProvider");
  }
  return context;
};
