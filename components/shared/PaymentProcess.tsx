// CustomModal.tsx

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [dynamicClassNames, setDynamicClassNames] = useState("");
  const [click, setClick] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader></DialogHeader>
      <DialogContent
        className={`sm:max-w-[100] bg-slate-200 ${dynamicClassNames}`}
        onInteractOutside={(e) => {
          e.preventDefault();
          e.preventDefault();
          if (!click) {
            setDynamicClassNames("animate-pulse border-red-500");

            setTimeout(() => {
              setDynamicClassNames(""); // Reset the class after 1 second
            }, 100);
          }
        }}
      >
        <iframe title="Payment" src={paymentUrl} width="100%" height="400px" />
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

export default CustomModal;
