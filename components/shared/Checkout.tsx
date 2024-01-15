import React, { useEffect } from "react";

import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
const flutter_key = process.env.REACT_APP_FLUTTER_PUBLIC_KEY!;
console.log(flutter_key);
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
  // if (!flutter_key) {
  //   return (
  //     <div>
  //       <p>Error: Flutterwave public key is not defined.</p>
  //       {/* Optionally, provide instructions for setting the key */}
  //     </div>
  //   );
  // }
  console.log(flutter_key);
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
    <Button
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            console.log(response);
            closePaymentModal(); // this will close the modal programmatically
          },
          onClose: () => {},
        });
      }}
      type="submit"
      role="link"
      size="lg"
      className="button sm:w-fit"
    >
      {event.isFree ? "Get Ticket" : "Buy Ticket"}
    </Button>
    // </form>
  );
};

export default Checkout;
