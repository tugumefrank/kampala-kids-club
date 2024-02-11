import React, { useEffect, useState, useRef } from "react";

import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";
import CustomModal from "@/components/shared/PaymentProcess";

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

const Checkout = ({
  event,
  userId,
  email,
  userImage,
}: {
  event: IEvent;
  userId: string;
  email: string;
  userImage: string;
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNetwork, setMobileNetwork] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [shouldRenderForm, setShouldRenderForm] = useState(true);
  const [dynamicClassNames, setDynamicClassNames] = useState("");
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(true);
  const [click, setClick] = useState(false);
  const [message, setMessage] = useState("defalaut message");

  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);
  //   if (query.get("success")) {
  //     console.log("Order placed! You will receive an email confirmation.");
  //   }

  //   if (query.get("canceled")) {
  //     console.log(
  //       "Order canceled -- continue to shop around and checkout when you’re ready."
  //     );
  //   }
  // }, []);
  useEffect(() => {
    // Initiate the first call to connect to SSE API
    const eventSource = new EventSource("/api/webhook/flutterwave");
    if (typeof eventSource !== "undefined") {
      console.log("working");
    } else {
      console.log("not working");
    }
    eventSource.onmessage = (event) => {
      // Parse the data received from the stream into JSON
      // Add it the list of messages seen on the page
      const tmp = JSON.parse(event.data);
      console.log(tmp);
      setMessage(tmp);

      // Do something with the obtained message
    };

    // As the component unmounts, close listener to SSE API
    return () => {
      eventSource.close();
    };
  }, []);

  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
      mobileNumber,
      mobileNetwork,
      email,
    };
    try {
      const response = await checkoutOrder(order);
      console.log(response);

      // Check if the response has a redirect URL and open model to render the URL
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
          <Button className="button sm:w-fit">
            {event.isFree ? "Get Ticket" : "Buy Ticket"}
          </Button>
        </DialogTrigger>
        {/* <DialogContent className="sm:max-w-[425px] bg-green-200">
          <DialogHeader>
            <DialogTitle className=" text-center">
              Get ticket for {event.title}
            </DialogTitle>
            <DialogDescription className=" text-center">
              Pay With Mobile Money
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-5 md:flex-row">
              <Input
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
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent> */}
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
                Buy ticket for {event.title}
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
                Pay Now
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          ""
        )}
      </Dialog>
    </>
  );
};

export default Checkout;
