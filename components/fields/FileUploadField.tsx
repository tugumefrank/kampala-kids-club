// File: ./fields/FileUploadField.tsx

import React from "react";
import {
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";

export const FileUploadFieldFormElement: FormElement = {
  type: "FileUploadField",

  construct: (id: string) => ({
    id,
    type: "FileUploadField",
  }),

  designerBtnElement: {
    icon: () => <span>📁</span>, // Replace with your icon component
    label: "File Upload",
  },

  designerComponent: ({ elementInstance }) => (
    <div>{elementInstance.id}</div> // Replace with your designer component
  ),

  formComponent: ({
    elementInstance,
    submitValue,
    isInvalid,
    defaultValue,
  }) => (
    <input type="file" id={elementInstance.id} /> // Replace with your form component
  ),

  propertiesComponent: ({ elementInstance }) => (
    <div>{elementInstance.id}</div> // Replace with your properties component
  ),

  validate: (formElement, currentValue) => {
    // Add your validation logic here
    return true;
  },
};
