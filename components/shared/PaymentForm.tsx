import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

import {
  Dialog,
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

const PaymentForm = ({
  FormSubmitstatus,
  FormErrorStatus,
  childName,
  childDetails,
}: any) => {
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
  } = useMobileContext();

  const [data, setData] = useState("");
  const router = useRouter();

  const fetchSseData = async () => {
    try {
      const response = await fetch("/api/sse");
      const result = await response.text();
      console.log("Data from the server:", result);
      if (result === "/dashboard") {
        setData(result);
        setIsModalOpen(false);
        router.push(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchSseData();

    // Polling interval (e.g., every 5 seconds)
    const intervalId = setInterval(() => {
      console.log("Fetching data...");
      fetchSseData();
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const onCheckout = async () => {
    const order = {
      transactionType,
      mobileNumber,
      mobileNetwork,
      ...childDetails,
    };
    console.log(childDetails);
    try {
      const response = await childPayment(order);
      console.log(response);

      if (response && response.status == "success") {
        console.log("data received from api end point");
        setIsPaymentFormOpen(false);
        setPaymentUrl(response.meta.authorization.redirect);
        setIsModalOpen(true);
      } else if ((response.message = "internal server error")) {
        setStatus("backend service unavailable");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle the error as needed
    }
  };

  return (
    <>
      <CustomModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        paymentUrl={paymentUrl}
      />{" "}
      <Dialog>
        <DialogTrigger asChild>
          <Button type="submit" className="button col-span-2 w-full">
            {FormSubmitstatus ? "Submitting..." : "Submit and Pay"}
          </Button>
        </DialogTrigger>
        {shouldRenderForm && isPaymentFormOpen ? (
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
              <DialogTitle className=" text-center">
                Pay for {childName}
              </DialogTitle>
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
