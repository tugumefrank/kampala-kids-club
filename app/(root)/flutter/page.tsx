"use client";
import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

export default function flutter() {
  const config = {
    public_key: "FLWPUBK-8aae95d6f591a4a0454e278bf3397829-X",
    tx_ref: Date.now(),
    amount: 100,
    currency: "UGX",
    payment_options: "card,mobilemoney",
    customer: {
      email: "user@gmail.com",
      phone_number: "070********",
      name: "john doe",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <h1>Hello Test user</h1>

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button>
    </div>
  );
}
