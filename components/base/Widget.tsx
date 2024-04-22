import React, { useEffect, useRef, useState } from "react";

interface WidgetProps {
  children: React.ReactNode;
  isDragging: boolean;
  onDrop?: (file: File) => void;
}

export default function Widget({ children, isDragging, onDrop }: WidgetProps) {
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  return (
    <article
      className="flex aspect-video w-72 items-center justify-center rounded-lg bg-gray-100 relative overflow-hidden"
      onDragOver={(e) => {
        console.log("drag over");

        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => {
        setIsDraggingOver(false);
      }}
      onDrop={(e) => {
        if (onDrop === undefined) return;
        e.preventDefault();
        onDrop(e.dataTransfer.files[0]);
      }}
    >
      {isDragging && (
        <div
          className={`${isDraggingOver ? "bg-gray-400" : "bg-gray-100 bg-opacity-80"}
          absolute inset-0  flex items-center justify-center`}
        >
          <p className="text-gray-500">Drop here</p>
        </div>
      )}
      <div className="w-9/12 flex h-full flex-col items-center justify-center overflow-hidden">
        {children}
      </div>
    </article>
  );
}
