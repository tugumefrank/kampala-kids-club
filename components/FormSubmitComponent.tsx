"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/lib/actions/formBuilder.actions";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Image from "next/image";

function FormSubmitComponent({
  formUrl,
  content,
  formImageUrl,
}: {
  content: FormElementInstance[];
  formUrl: string;
  formImageUrl: string;
}) {
  const router = useRouter();
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-white w-full p-8 overflow-y-auto  border-t-8 border-indigo-500 rounded-lg">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form
          </p>
          <div className="flex justify-between">
            <Button
              variant={"link"}
              asChild
              onClick={() => {
                setSubmitted(false);
                router.push(`${window.location.origin}/submit/${formUrl}`);
              }}
            >
              <Link
                href={`${window.location.origin}/submit/${formUrl}`}
                className="gap-2"
              >
                <BsArrowLeft />
                Submit Another
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href={`/`} className="gap-2">
                Back to Home
                <BsArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start w-full  h-full items-center p-8">
      {formImageUrl && (
        <div className="max-w-[760px] flex flex-col gap-4  bg-white w-full  border-t-4 border-indigo-500 rounded-lg mb-4">
          <Image
            src={formImageUrl}
            alt="form image"
            width={1000}
            height={1000}
            className="h-full max-h-[200px] object-cover object-center rounded-lg"
          />
        </div>
      )}

      <div
        key={renderKey}
        className="max-w-[760px] flex flex-col gap-4  bg-white w-full p-8  border-t-8 border-indigo-500 rounded-lg"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
