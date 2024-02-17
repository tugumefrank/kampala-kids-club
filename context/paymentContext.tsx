"use client";
import { createContext, useContext, ReactNode, useState } from "react";

type MobileContextType = {
  transactionType: string;
  mobileNumber: string;
  mobileNetwork: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  setMobileNetwork: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>; // Added setter
  shouldRenderForm: boolean;
  setShouldRenderForm: React.Dispatch<React.SetStateAction<boolean>>; // Added setter
  dynamicClassNames: string;
  setDynamicClassNames: React.Dispatch<React.SetStateAction<string>>; // Added setter
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>; // Added setter
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // Added setter
  isPaymentFormOpen: boolean;
  setIsPaymentFormOpen: React.Dispatch<React.SetStateAction<boolean>>; // Added setter
  paymentUrl: string;
  setPaymentUrl: React.Dispatch<React.SetStateAction<string>>; // Added setter
};

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export const MobileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [mobileNetwork, setMobileNetwork] = useState<string>("");
  const [status, setStatus] = useState("");
  const [shouldRenderForm, setShouldRenderForm] = useState(true);
  const [dynamicClassNames, setDynamicClassNames] = useState("");
  const [click, setClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState("");
  const transactionType = "MissLittleWildlifeRegistration";
  return (
    <MobileContext.Provider
      value={{
        transactionType,
        mobileNumber,
        mobileNetwork,
        setMobileNumber,
        setMobileNetwork,
        status,
        setStatus,
        shouldRenderForm,
        setShouldRenderForm,
        dynamicClassNames,
        setDynamicClassNames,
        click,
        setClick,
        isModalOpen,
        setIsModalOpen,
        isPaymentFormOpen,
        setIsPaymentFormOpen,
        paymentUrl,
        setPaymentUrl,
      }}
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
