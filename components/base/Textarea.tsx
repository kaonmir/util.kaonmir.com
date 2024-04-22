import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError?: boolean;
}

export default function Textarea(props: TextareaProps) {
  /* TODO Enhanced text area : https://stackoverflow.com/questions/40331780/reactjs-handle-tab-character-in-textarea */
  const restProps = { ...props };
  delete restProps.isError;
  return (
    <textarea
      {...restProps}
      className={`
        ${props.className}
        ${props.isError ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"}
        w-full h-20 leading-4
        resize-none focus:outline-none shadow-none
        textarea-bordered textarea-md textarea`}
    />
  );
}
