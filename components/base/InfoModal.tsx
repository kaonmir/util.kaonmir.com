import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

interface InfoModalProps {}

export default function InfoModal({}: InfoModalProps) {
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
        className="absolute top-0 right-0 m-2 z-10 clickable text-gray-300 hover:text-gray-500"
        onClick={() => setIsOpened(!isOpened)}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </div>
      {isOpened && (
        <div
          ref={modalRef}
          className={`
        absolute top-0 right-0 w-40 -mr-[10.5rem] bg-white rounded-lg
        z-10 p-2 shadow-lg
      `}
        >
          InfoModal
        </div>
      )}
    </div>
  );
}
