import { GetFormContentByUrl } from "@/lib/actions/formBuilder.actions";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("form not found");
  }
  // Log the raw content before parsing
  console.log("Raw form content:", form.content);
  console.log(form);
  // Parse the JSON string to get the array
  const formContent = form ? (JSON.parse(form) as FormElementInstance[]) : [];

  console.log(formContent);
  // Convert to a plain JavaScript object
  const plainFormContent = formContent.map((item) => ({ ...item }));
  console.log(plainFormContent);
  return (
    <FormSubmitComponent formUrl={params.formUrl} content={plainFormContent} />
  );
}

export default SubmitPage;
