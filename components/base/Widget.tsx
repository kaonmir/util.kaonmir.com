import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

interface WidgetProps {
  children?: React.ReactNode;
  isDragging?: boolean;
  onDrop?: (files: FileList) => void;

  description: string;
}

function DragOverlay({ isDraggingOver }: { isDraggingOver: boolean }) {
  return (
    <div
      className={`${
        isDraggingOver ? "bg-gray-400" : "bg-gray-200 bg-opacity-90"
      } absolute inset-0 items-center justify-center`}
    >
      <div
        className={`${
          isDraggingOver ? "border-gray-200" : "border-gray-400"
        } absolute inset-0 m-3 border-dashed border-2 rounded-lg `}
      >
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          <p className={isDraggingOver ? "text-gray-200" : "text-gray-400"}>
            Drop here
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Widget({ children, isDragging, onDrop }: WidgetProps) {
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  // Drag and drop events
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const onDropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    if (onDrop === undefined) return;
    onDrop(e.dataTransfer.files);
    setIsDraggingOver(false);
  };

  return (
    <article
      className="flex aspect-video w-72 items-center justify-center rounded-lg bg-gray-100 relative overflow-hidden"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDropHandler}
    >
      {onDrop && isDragging && <DragOverlay isDraggingOver={isDraggingOver} />}
      {/* top right info icon  */}
      <div className="absolute top-0 right-0 m-2 z-10">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="clickable text-gray-300 hover:text-gray-500"
        />
      </div>
      <div className="w-9/12 flex h-full flex-col items-center justify-center overflow-hidden">
        {children}
      </div>
    </article>
  );
}
