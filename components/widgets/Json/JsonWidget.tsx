"use client";

import ButtonGroup from "@/components/base/ButtonGroup";
import Textarea from "@/components/base/Textarea";
import Widget from "@/components/base/Widget";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface JsonWidgetProps {
  isDragging: boolean;
}

export default function JsonWidget({ isDragging }: JsonWidgetProps) {
  const [text, setText] = useState<string>('{\n  "key": "value"\n}');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      JSON.parse(text);
    } catch (error) {
      setError(true);
      return;
    }

    setError(false);
  }, [text]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const onClickBeaufify = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (error) {
      toast.error("Invalid JSON data");
      return;
    }
    const value = JSON.parse(text);

    navigator.clipboard
      .writeText(JSON.stringify(value, null, 2))
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
        toast.error("Could not copy to clipboard");
      });
  };

  const onClickMinify = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (error) {
      toast.error("Invalid JSON data");
      return;
    }

    const value = JSON.parse(text);

    navigator.clipboard
      .writeText(JSON.stringify(value))
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
        toast.error("Could not copy to clipboard");
      });
  };

  return (
    <Widget
      description="JSON Beautifier and Minifier"
      isDragging={isDragging}
      onDrop={(files: FileList) => {
        if (files.length === 0) return;
        const file = files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;

          if (typeof result === "string") {
            if (result.includes("�")) {
              toast.error("Invalid file type");
              return;
            }
            setText(result);
          }
        };
        reader.readAsText(file);
      }}
    >
      <Textarea
        isError={error}
        className={""}
        placeholder="Put JSON data here"
        onChange={onChange}
        value={text}
      ></Textarea>
      <ButtonGroup
        buttons={[
          { type: "button", text: "Beautify", onClick: onClickBeaufify },
          { type: "button", text: "Minify", onClick: onClickMinify },
        ]}
      />
    </Widget>
  );
}
