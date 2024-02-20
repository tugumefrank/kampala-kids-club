import { GetFormById } from "@/lib/actions/formBuilder.actions";
import FormBuilder from "@/components/FormBuilder";
import React from "react";
import { string } from "zod";

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(id);
  if (!form) {
    throw new Error("form not found");
  }
  console.log(form);
  return <FormBuilder form={form} />;
}

export default BuilderPage;
