"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import PaymentSucess from "@/components/shared/PaymentSucess";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { childFormSchema } from "@/lib/validator";
import * as z from "zod";
import { childFormSchemaDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useUploadThing } from "@/lib/uploadthing";

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { createChild, ChildPayment } from "@/lib/actions/register.actions";
import { IEvent } from "@/lib/database/models/event.model";
import toast, { Toaster } from "react-hot-toast";
import PaymentForm from "@/components/shared/PaymentForm";

type ChildFormProps = {
  // Your prop types here
};
let globalChildName: string | undefined;
const ChildForm: React.FC<ChildFormProps> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof childFormSchema>>({
    resolver: zodResolver(childFormSchema),
    defaultValues: childFormSchemaDefaultValues,
  });

  const onSubmit = async (values: z.infer<typeof childFormSchema>) => {
    // toast(<PaymentSucess />);
    const childname = values.childName;
    globalChildName = childname;
    try {
      const res = await createChild(values);
      console.log(res);
      if (res) {
        // toast(<PaymentSucess />);
        // Call the Twilio API to send a WhatsApp message
        const twilioResponse = await fetch("/api/twilio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: "+256758973319",
            message: "Your WhatsApp message here from nodejs",
          }),
        });
        const twilioData = await twilioResponse.json();
        console.log(twilioData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-slate-200 rounded-2xl p-5"
      >
        <label className="p-semibold-18 text-center">
          Fill Out The Entry Form
        </label>
        {/* {JSON.stringify(form.formState.errors, null, 2)} */}
        {/* Personal Information */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="childName"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Name(girl)"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="childAge"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div>
                    <Input
                      type="number"
                      placeholder="Age (3-12yrs) "
                      {...field}
                      className="input-field-register "
                    />{" "}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* School and Class Information */}
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="School"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Class"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address Information */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Nationality"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="residentialAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Residential Address"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Upload Child's Photo */}
        <div className="flex flex-col gap-5">
          <label className="p-semibold-18">Upload Child's Current Photo</label>
          <FormField
            control={form.control}
            name="childPhotoUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Parent/Guardian Information */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="parentGuardianName"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Parent/Guardian Name"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parentGuardianContact"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Parent/Guardian Contact"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="whatsappNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Whatsapp number"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="placeOfWork"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Place of work"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="relationshipWithApplicant"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Relationship with the applicant"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Upload Parents ID or Passport */}
        <div className="flex flex-col gap-5">
          <label className="p-semibold-18">Upload Parents ID or Passport</label>
          <FormField
            control={form.control}
            name="parentIDUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Healthy Status */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="healthyStatus"
            render={({ field }) => (
              <FormItem className="w-full">
                <Textarea
                  placeholder="Healthy status (Specify if any)"
                  {...field}
                  className="textarea rounded-2xl"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Next of kin's contact */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="nextOfKinContact"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Next of kin's contact"
                  {...field}
                  className="input-field-register"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Terms & Conditions Checkbox */}
        <div className="wrapperform flex flex-col gap-5 md:flex-row">
          {/* <FormField
            control={form.control}
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <label className="flex items-center">
                    <Checkbox
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="mr-2 h-5 w-5 border-2 border-primary-500"
                    />
                    <span className="pr-3 leading-none">
                     
                      Little Miss Wildlife -Auditions & all activities are
                      always photographed and videotaped, By allowing your child
                      to attend these activities, and by attending our events,
                      you give Little Miss Wildlife - Uganda permission to take
                      photographs of you and your child or photographs in which
                      you may be involved with others for the purpose of
                      promoting the show or it's partners. You release Little
                      Miss Wildlife and it's designated photographers from any
                      and all claims arising out of the use of the photos. These
                      photos don't include the photographs that you submit for
                      consideration to attend the Auditions. By submitting this
                      form, you agree to our terms and conditions. All
                      applicants disclaim in whole or part the right of or to
                      any property or interest in any property submitted with
                      their Auditions application form. Little Miss Wildlife
                      Uganda makes no representation or warranties to the
                      applicant as to their qualifications to become
                      participants. The applicant acknowledges to having
                      carefully examined this statement and further acknowledges
                      that they have been informed of their rights before
                      submitting this form.
                    </span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        {/* Payment Information */}
        <div className="wrapperform flex flex-col gap-5 md:flex-row">
          {/* <FormField
            control={form.control}
            name="paymentAgreement"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <label className="flex items-center">
                    <Checkbox
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="mr-2 h-5 w-5 border-2 border-primary-500"
                    />
                    <span className="pr-3 leading-none">
                      I understand that I have to pay a non-refundable
                      registration fee of 50,000 UGX on completing my
                      registration form.
                    </span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        {/* Submit Button */}
        {/* <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit and Pay"}
        </Button> */}
        <FormField
          control={form.control}
          name="nextOfKinContact"
          render={({ field }) => (
            <FormItem className="w-full">
              <PaymentForm
                FormSubmitstatus={form.formState.isSubmitting}
                FormErrorStatus={form.formState.errors}
                childName={globalChildName}
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChildForm;
