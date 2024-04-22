import React, { useEffect, useRef, useState } from "react";

interface WidgetProps {
  children: React.ReactNode;
  enableFileDrop?: boolean;
  onFileDrop?: (file: File) => void;
}

export default function Widget({
  children,
  enableFileDrop = false,
  onFileDrop = () => {},
}: WidgetProps) {
  return (
    <article className="flex aspect-video w-72 items-center justify-center rounded-lg bg-gray-100 relative">
      <div className="w-9/12 flex h-full flex-col items-center justify-center overflow-hidden">
        {children}
      </div>
    </article>
  );
}
