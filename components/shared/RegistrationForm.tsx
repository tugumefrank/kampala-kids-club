"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
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
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";

type EventFormProps = {
  // Your prop types here
};

const EventForm: React.FC<EventFormProps> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {}, // Add your default values here
  });

  const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    // Your submission logic here
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-slate-200 rounded-2xl p-5"
      >
        <label className="p-semibold-18 text-center">
          Fill Out The Enter Form
        </label>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Your form fields go here */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Name(must be a girl 3-12 yrs)"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Age"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="School"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Class"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Nationality"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Residential Address
"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}
        </div>
        {/* Description Section */}
        {/* File Upload Section */}
        <div className="flex flex-col gap-5 ">
          <label className="p-semibold-18 ">Upload Child's current photo</label>
          <FormField
            control={form.control}
            name="imageUrl"
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
          {/* Repeat similar structure for other form fields */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Parent/Guardian Name

"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Parent/Guardian Contact
"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}
        </div>{" "}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Whatsapp number
"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Place of work
"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}
        </div>{" "}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Relationship with the applicant
"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}
        </div>
        <div className="flex flex-col gap-5 ">
          <label className="p-semibold-18 ">
            Upload Parents ID or Passport
          </label>
          <FormField
            control={form.control}
            name="imageUrl"
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
          {/* Repeat similar structure for other form fields */}
        </div>
        {/* Description Section */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <Textarea
                  placeholder="Healthy status(Specify if any)"
                  {...field}
                  className="textarea rounded-2xl"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="Next of kin's contact

"
                  {...field}
                  className="input-field-register"
                />
              </FormItem>
            )}
          />
          {/* Repeat similar structure for other form fields */}
        </div>
        {/* Terms & Conditions Checkbox */}
        <div className="wrapperform flex flex-col gap-5 md:flex-row">
          <FormField
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
                      disabled={field.disabled}
                      name={field.name}
                      ref={field.ref}
                      className="mr-2 h-5 w-5 border-2 border-primary-500"
                    />
                    <span className=" pr-3 leading-none">
                      Disclaimer, terms and conditions apply * Little Miss
                      Wildlife -Auditions & all activities are always
                      photographed and videotaped, By allowing your child to
                      attend these activities, and by attending our events, you
                      give Little Miss Wildlife - Uganda permission to take
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
          />
        </div>
        {/* Terms & Conditions Checkbox */}
        <div className="wrapperform flex flex-col gap-5 md:flex-row">
          <FormField
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
                      disabled={field.disabled}
                      name={field.name}
                      ref={field.ref}
                      className="mr-2 h-5 w-5 border-2 border-primary-500"
                    />
                    <span className=" pr-3 leading-none">
                      I understand that I have to pay a non-refundable
                      registration fee of 50,000 UGX on completing my
                      registration form.
                    </span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Your submit button goes here */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit and Pay"}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
