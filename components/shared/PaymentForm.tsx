import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ChildPayment } from "@/lib/actions/register.actions";
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
import { useRouter } from "next/router";
import EventSource from "eventsource";
const PaymentForm = ({
  FormSubmitstatus,
  FormErrorStatus,
  childName,
  childDetails,
}: any) => {
  const {
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
  const router = useRouter();

  const onCheckout = async () => {
    const [isOrderCreated, setIsOrderCreated] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState(null); // Store redirect URL from API
    useEffect(() => {
      // Initiate the first call to connect to SSE API
      const eventSource = new EventSource("/api/stream");

      eventSource.addEventListener("message", (event) => {
        // Parse the data received from the stream into JSON
        // Add it the list of messages seen on the page
        const tmp = JSON.parse(event.data);
        console.log(tmp);
        // Do something with the obtained message
      });

      // As the component unmounts, close listener to SSE API
      return () => {
        eventSource.close();
      };
    }, []);
    const order = {
      mobileNumber,
      mobileNetwork,
      ...childDetails,
    };
    console.log(childDetails);
    try {
      const response = await ChildPayment(order);
      console.log(response);

      if (
        response &&
        response.flutterwaveResponse &&
        response.flutterwaveResponse.meta &&
        response.flutterwaveResponse.meta.authorization &&
        response.flutterwaveResponse.meta.authorization.redirect
      ) {
        setIsPaymentFormOpen(false);
        setPaymentUrl(response.flutterwaveResponse.meta.authorization.redirect);
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
