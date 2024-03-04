import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useCallback } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/shared/PaymentProcess";
import { useMobileContext } from "@/context/paymentContext";
import { childPayment } from "@/lib/actions/eventPayment.action";
import { toast } from "../ui/use-toast";

const PaymentForm = ({ showDialog, closeDialog, onPaymentSuccess }: any) => {
  const {
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
    formErrors,
    setFormErrors,
    setFormValues,
    formValues,
  } = useMobileContext();

  // const fetchEvents = () => {
  //   // Create a new EventSource
  //   const eventSource = new EventSource(
  //     `${process.env.NEXT_PUBLIC_NODE_PUBLIC_SERVER_URL}events`
  //   );

  //   eventSource.onmessage = (event) => {
  //     // Log the event data to the console
  //     const data = JSON.parse(event.data);
  //     console.log(data);

  //     if (data.paymentStatus === "success") {
  //       setIsModalOpen(false);
  //       toast({
  //         title: "Success",
  //         description: "Payment received",
  //         variant: "default",
  //         className: "bg-green-500",
  //       });
  //       onPaymentSuccess();
  //     }
  //   };

  //   // As the component unmounts, close listener to SSE API
  //   return () => {
  //     eventSource.close();
  //   };
  // };
  // // ...

  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!ws) {
      const websocket = new WebSocket(
        `${
          process.env.NEXT_PUBLIC_NODE_PUBLIC_SERVER_URL?.replace(
            "http",
            "ws"
          ) ?? ""
        }`
      );
      websocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      setWs(websocket);
    }

    return () => {
      ws?.close();
    };
  }, [ws]);

  const fetchEvents = () => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.paymentStatus === "success") {
        setIsModalOpen(false);
        toast({
          title: "Success",
          description: "Payment received",
          variant: "default",
          className: "bg-green-500",
        });
        onPaymentSuccess();
      }
    };
  };

  const onCheckout = async () => {
    const order = {
      transactionType,
      mobileNumber,
      mobileNetwork,
    };

    try {
      const response = await childPayment(order);
      console.log(response);

      if (response && response.status == "success") {
        setIsPaymentFormOpen(false);
        setPaymentUrl(response.meta.authorization.redirect);
        setIsModalOpen(true);
        fetchEvents();
      } else if ((response.message = "internal server error")) {
        setStatus("backend service unavailable");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle the error as needed
    }
  };
  const resetForm = useCallback(() => {
    // Reset form values and errors
    setFormValues({});
    setFormErrors({});
  }, [formValues, setFormErrors]);
  const handlerOpenChange = () => {
    closeDialog();
    resetForm();
    setFormErrors({});
  };
  console.log(showDialog);
  console.log(formErrors);
  return (
    <>
      <CustomModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        paymentUrl={paymentUrl}
      />{" "}
      <Dialog open={showDialog} onOpenChange={handlerOpenChange}>
        {isPaymentFormOpen ? (
          <DialogContent
            className={`sm:max-w-[100] bg-slate-200  ${dynamicClassNames}`}
            onInteractOutside={(e) => {
              e.preventDefault();

              if (!click) {
                setDynamicClassNames("animate-pulse border-red-500");

                setTimeout(() => {
                  setDynamicClassNames(""); // Reset the class after 1 second
                }, 100);
              }
            }}
          >
            <DialogHeader>
              <DialogTitle className=" text-center">Pay for</DialogTitle>
              <DialogDescription className=" text-center">
                Pay With Mobile Money
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-5 md:flex-row">
                <Input
                  type="number"
                  id="name"
                  placeholder="Enter Mobile Number"
                  className="input-field  w-full"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />{" "}
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <Select value={mobileNetwork} onValueChange={setMobileNetwork}>
                  <SelectTrigger className="w-full input-field">
                    <SelectValue placeholder="Choose mobile network " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Companys</SelectLabel>
                      <SelectItem value="AIRTEL">AIRTEL</SelectItem>
                      <SelectItem value="MTN">MTN</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="button sm:w-fit"
                onClick={onCheckout}
              >
                Process Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          "some fields missing"
        )}
      </Dialog>
    </>
  );
};

export default PaymentForm;
