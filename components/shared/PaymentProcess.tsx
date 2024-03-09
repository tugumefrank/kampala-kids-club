// CustomModal.tsx

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMobileContext } from "@/context/paymentContext";

interface CustomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentUrl: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onOpenChange,
  paymentUrl,
}) => {
  const { setIsPaymentFormOpen } = useMobileContext();
  const [dynamicClassNames, setDynamicClassNames] = useState("");
  const [click, setClick] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader></DialogHeader>
      <DialogContent
        className={`sm:max-w-[100] bg-slate-200 ${dynamicClassNames}`}
        onInteractOutside={(e) => {
          e.preventDefault();
          if (!click) {
            setDynamicClassNames("animate-pulse border-red-500");

            setTimeout(() => {
              setDynamicClassNames(""); // Reset the class after 1 second
            }, 100);
          }
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          console.log("clicked close button");
          // setIsPaymentFormOpen(true);
        }}
      >
        <iframe title="Payment" src={paymentUrl} width="100%" height="400px" />
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

export default CustomModal;
