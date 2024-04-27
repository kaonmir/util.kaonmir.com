import React from "react";
import Widget from "../base/Widget";
import Textarea from "@/components/util/Textarea";

type SupportedType = "base64" | "url";

const endecode = {
  base64: {
    encode: (text: string) => btoa(text),
    decode: (text: string) => atob(text),
  },
  url: {
    encode: (text: string) => encodeURIComponent(text),
    decode: (text: string) => decodeURIComponent(text),
  },
} as const;

export default function EncodeWidget() {
  const [activeTab, setActiveTab] = React.useState<SupportedType>("base64");
  const [rawText, setRawText] = React.useState<string>("");
  const [encodedText, setEncodedText] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  const onChangeRawText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawText(e.target.value);
    try {
      const encoded = endecode[activeTab].encode(e.target.value);
      setEncodedText(encoded);
      setError(false);
    } catch (e) {
      setEncodedText("");
      setError(true);
    }
  };

  const onChangeEncodedText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEncodedText(e.target.value);
    try {
      const decoded = endecode[activeTab].decode(e.target.value);
      setRawText(decoded);
      setError(false);
    } catch (e) {
      setRawText("");
      setError(true);
    }
  };

  const onChangeTab = (tab: SupportedType) => {
    setActiveTab(tab);
    try {
      const encoded = endecode[tab].encode(rawText);
      setEncodedText(encoded);
      setError(false);
    } catch (e) {
      setEncodedText("");
      setError(true);
    }
  };

  return (
    <Widget description="Base64 encode/decode">
      <div className="flex flex-col">
        <div>
          <Textarea
            isError={error}
            // className={""}
            placeholder="Put Raw data here"
            onChange={onChangeRawText}
            value={rawText}
          />
        </div>
        <div className="flex flex-row justify-around">
          <div
            className={`
            ${activeTab === "base64" ? "bg-blue-100 text-blue-500" : "text-gray-400 bg-gray-100"}
            clickable badge hover:text-blue-500
            w-16
            `}
            onClick={() => onChangeTab("base64")}
          >
            Base64
          </div>
          <div
            className={`
            ${activeTab === "url" ? "bg-blue-100 text-blue-500" : "text-gray-400 bg-gray-100"}
            clickable badge hover:text-blue-500
            w-16
            `}
            onClick={() => onChangeTab("url")}
          >
            URL
          </div>
        </div>
        <div>
          <Textarea
            // isError={error}
            // className={""}
            placeholder={`Put ${activeTab === "base64" ? "Base64" : "URL"} data here`}
            onChange={onChangeEncodedText}
            value={encodedText}
          />
        </div>
      </div>
    </Widget>
  );
}
