"use client";

import CrontabWidget from "@/components/widgets/Cron/CronWidget";
import JsonWidget from "@/components/widgets/Json/JsonWidget";
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
      <div className="w-full min-w-72 p-0 sm:p-2">
        <div className="flex flex-wrap gap-x-5 gap-y-5 ">
          <JsonWidget isDragging={isDragging} />
          <CrontabWidget isDragging={isDragging} />
        </div>
      </div>
    </main>
  );
}
