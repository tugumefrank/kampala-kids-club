"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useTransition,
  TransitionStartFunction,
  useRef,
} from "react";

type MobileContextType = {
  transactionType: "FormPayment" | "EventPayment"; // Updated type
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
  setPaymentUrl: React.Dispatch<React.SetStateAction<string>>;
  pending: boolean;
  startTransition: TransitionStartFunction;

  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  // formValues: React.MutableRefObject<{ [key: string]: string }>;
  // formErrors: React.MutableRefObject<{ [key: string]: boolean }>;
  formValues: { [key: string]: string };
  setFormValues: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  formErrors: { [key: string]: boolean };
  setFormErrors: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  renderKey: number;
  setRenderKey: React.Dispatch<React.SetStateAction<number>>;
  setTransactionType: React.Dispatch<
    React.SetStateAction<"FormPayment" | "EventPayment">
  >; // Added setter
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
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();
  const [transactionType, setTransactionType] = useState<
    "FormPayment" | "EventPayment"
  >("FormPayment"); // Updated type
  // const formValues = useRef<{ [key: string]: string }>({});
  // const formErrors = useRef<{ [key: string]: boolean }>({});
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  return (
    <MobileContext.Provider
      value={{
        setFormValues,

        formValues,
        formErrors,
        setFormErrors,
        renderKey,
        setRenderKey,
        pending,
        startTransition,
        submitted,
        setSubmitted,
        transactionType,
        setTransactionType,
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
