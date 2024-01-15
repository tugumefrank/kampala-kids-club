import React, { useEffect } from "react";

import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
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
    };

    await checkoutOrder(order);
  };
  type Customer = {
    email: string;
    phone_number: string;
    name: string;
  };

  type Customizations = {
    title: string;
    description: string;
    logo: string;
  };

  type FlutterwaveConfig = {
    public_key: string;
    tx_ref: string;
    amount: number;
    currency: string;
    payment_options: string;
    customer: Customer;
    customizations: Customizations;
  };

  const config: FlutterwaveConfig = {
    public_key: "FLWPUBK_TEST-bc83a76f386cc698b775615993c2c9b2-X",
    tx_ref: Date.now().toString(),
    amount: parseFloat(event.price),
    currency: "UGX",
    payment_options: "card,mobilemoneyuganda",
    customer: {
      email: email,
      phone_number: "070********",
      name: "john doe",
    },
    customizations: {
      title: event.title,
      description: event.description,
      logo: userImage,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  return (
    // <form action={onCheckout} method="post">
    // <Button
    //   onClick={() => {
    //     handleFlutterPayment({
    //       callback: (response) => {
    //         console.log(response);
    //         closePaymentModal(); // this will close the modal programmatically
    //       },
    //       onClose: () => {},
    //     });
    //   }}
    //   type="submit"
    //   role="link"
    //   size="lg"
    //   className="button sm:w-fit"
    // >
    //   {event.isFree ? "Get Ticket" : "Buy Ticket"}
    // </Button>
    // </form>
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
            />{" "}
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <Select>
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
          <Button type="submit" className="button sm:w-fit">
            Pay Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;
