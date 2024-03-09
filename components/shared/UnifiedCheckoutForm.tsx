import React, { useCallback, useEffect } from "react";
import { IEvent } from "@/lib/database/models/event.model";
import { useMobileContext } from "@/context/paymentContext";
import { toast } from "../ui/use-toast";
import {
  EventPaymentAction,
  FormPaymentAction,
} from "@/lib/actions/Payment.action";
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
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
type UnifiedCheckoutFormProps = {
  event?: IEvent;
  userId?: string;
  email?: string;
  userImage?: string;
  showDialog?: boolean;
  closeDialog?: () => void;
  onPaymentSuccess?: () => Promise<void>;
};

const UnifiedCheckoutForm: React.FC<UnifiedCheckoutFormProps> = ({
  event,
  userId,
  email,
  userImage,
  showDialog,
  closeDialog,
  onPaymentSuccess,
}) => {
  const {
    transactionType,
    setTransactionType,
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
  const router = useRouter();
  useEffect(() => {
    if (event) {
      setTransactionType("EventPayment");
    } else {
      setTransactionType("FormPayment");
    }
  }, [event, setTransactionType]);

  const fetchEvents = () => {
    // Create a new EventSource
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_NODE_PUBLIC_SERVER_URL}events`
    );

    eventSource.onmessage = (event) => {
      // Log the event data to the console
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.transactionType === "FormPayment") {
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
        setIsModalOpen(false);
        toast({
          title: "Success",
          description: "Payment received",
          variant: "default",
          className: "bg-green-500",
        });
      } else if (data.transactionType === "EventPayment") {
        setIsModalOpen(false);
        setIsPaymentFormOpen(false);
        toast({
          title: "Success",
          description: "Payment received",
          variant: "destructive",
        });
        router.push(`/tickets/${data.transactionId}`);
      }
    };

    // As the component unmounts, close listener to SSE API
    return () => {
      eventSource.close();
    };
  };

  const onCheckout = async () => {
    const order = {
      transactionType,
      mobileNumber,
      mobileNetwork,
    };
    const EventOrder: any = {
      eventTitle: event?.title,
      eventId: event?._id,
      price: event?.price,
      isFree: event?.isFree,
      buyerId: userId,
      mobileNumber,
      mobileNetwork,
      email,
      transactionType,
    };
    try {
      console.log(event?._id);
      let flutterwaveResponse;
      if (event?._id) {
        console.log(transactionType);
        flutterwaveResponse = await EventPaymentAction(EventOrder);
        console.log(flutterwaveResponse.status);
      } else {
        console.log(transactionType);
        flutterwaveResponse = await FormPaymentAction(order);
      }

      if (flutterwaveResponse && flutterwaveResponse.status === "success") {
        console.log(flutterwaveResponse);
        setIsPaymentFormOpen(false);
        setPaymentUrl(flutterwaveResponse.meta.authorization.redirect);
        setIsModalOpen(true);
        fetchEvents();
      } else if (
        flutterwaveResponse &&
        flutterwaveResponse.message === "internal server error"
      ) {
        setStatus("backend service unavailable");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  const resetForm = useCallback(() => {
    // Reset form values and errors
    setFormValues({});
    setFormErrors({});
  }, [formValues, setFormErrors]);
  const handlerOpenChange = () => {
    if (closeDialog) {
      closeDialog();
    }
    resetForm();
    setFormErrors({});
  };
  return (
    <>
      <CustomModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        paymentUrl={paymentUrl}
      />
      {event && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="button sm:w-fit"
              onClick={() => setIsPaymentFormOpen(true)}
            >
              {event.isFree ? "Get Ticket" : "Buy Ticket"}
            </Button>
          </DialogTrigger>

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
                  <Select
                    value={mobileNetwork}
                    onValueChange={setMobileNetwork}
                  >
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
      )}
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={handlerOpenChange}>
          {showDialog ? (
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
                  <Select
                    value={mobileNetwork}
                    onValueChange={setMobileNetwork}
                  >
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
            ""
          )}
        </Dialog>
      )}
    </>
  );
};

export default UnifiedCheckoutForm;
