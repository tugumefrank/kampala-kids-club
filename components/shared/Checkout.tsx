import React, { useEffect, useState, useRef } from "react";

import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";

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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Dropdown from "./Dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
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

      // Check if the response has a redirect URL
      if (
        response &&
        response.flutterwaveResponse &&
        response.flutterwaveResponse.meta &&
        response.flutterwaveResponse.meta.authorization &&
        response.flutterwaveResponse.meta.authorization.redirect
      ) {
        // Redirect to the specified URL
        window.location.href =
          response.flutterwaveResponse.meta.authorization.redirect;
      } else if ((response.message = "internal server error")) {
        setStatus("backend service unvailable");
        console.log(status);
      } else {
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle the error as needed
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="button sm:w-fit">
          {event.isFree ? "Get Ticket" : "Buy Ticket"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-green-200">
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
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;
