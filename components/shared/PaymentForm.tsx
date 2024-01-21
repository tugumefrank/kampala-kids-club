import React, { useState } from "react";
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

const PaymentForm = ({ FormSubmitstatus, FormErrorStatus, childName }: any) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNetwork, setMobileNetwork] = useState("");
  const [status, setStatus] = useState("");
  const shouldRenderForm = Object.keys(FormErrorStatus).length === 0;
  const [dynamicClassNames, setDynamicClassNames] = useState("");
  const [click, setClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const onCheckout = async () => {
    const order = {
      mobileNumber,
      mobileNetwork,
    };
    try {
      const response = await ChildPayment(order);
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
        // window.location.href =
        //   response.flutterwaveResponse.meta.authorization.redirect;
        setPaymentUrl(response.flutterwaveResponse.meta.authorization.redirect);
        setIsModalOpen(true);
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
        {shouldRenderForm ? (
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
