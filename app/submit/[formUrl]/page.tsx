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
  const formImageUrl = form.formImageUrl;
  console.log("Raw form content:", formImageUrl);
  console.log(form);
  // Parse the JSON string to get the array
  const formContent = form.content
    ? (JSON.parse(form.content) as FormElementInstance[])
    : [];

  console.log(formContent);
  // Convert to a plain JavaScript object
  const plainFormContent = formContent.map((item) => ({ ...item }));
  console.log(plainFormContent);
  return (
    <FormSubmitComponent
      formUrl={params.formUrl}
      content={plainFormContent}
      formImageUrl={formImageUrl}
    />
  );
}

export default SubmitPage;
