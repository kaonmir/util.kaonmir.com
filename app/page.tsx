"use client";

import EncodeWidget from "@/components/widget/Encode/EncodeWidget";
import CrontabWidget from "@/components/widget/cron/CronWidget";
import InspirationalQuotesWidget from "@/components/widget/inspirational_quotes/InspirationalQuotesWidget";
import JsonWidget from "@/components/widget/json/JsonWidget";
import { useState } from "react";

export default function Home() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between"
      onDrop={(e) => {
        setIsDragging(false);
        e.preventDefault();
      }}
      onDragOver={(e) => {
        setIsDragging(true);
        e.preventDefault();
      }}
      onDragLeave={() => {
        setIsDragging(false);
      }}
    >
      <div className="w-full min-w-72 p-0 sm:p-2 mt-5">
        <div className="flex flex-wrap gap-x-5 gap-y-5 justify-center">
          <EncodeWidget />
          <InspirationalQuotesWidget />
          <JsonWidget isDragging={isDragging} />
          <CrontabWidget />
        </div>
      </div>
    </main>
  );
}
