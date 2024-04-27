import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

interface InfoModalProps {
  description: string;
}

export default function InfoModal({ description }: InfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !infoRef.current?.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    if (isOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpened]);

  return (
    <div>
      <div
        ref={infoRef}
        onClick={() => setIsOpened(!isOpened)}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </div>
      <div
        ref={modalRef}
        className={`
      >
        <p className="text-sm text-gray-600 leading-4">{description}</p>
      </div>
    </div>
  );
}
