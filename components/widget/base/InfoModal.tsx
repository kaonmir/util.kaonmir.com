import useWindowSize from "@/components/hook/useWindowSize";
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
  const [isLeft, setIsLeft] = useState<boolean>(false);

  useEffect(() => {
    onResize();

    window.addEventListener("resize", onResize);
    return () => document.removeEventListener("resize", onResize);
  });

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

  const onResize = () => {
    const widgetRight = infoRef.current?.getBoundingClientRect().right;
    if (!widgetRight) return;

    const modalRight = widgetRight + 180; //! Size Hard Coded
    if (modalRight >= window.innerWidth) setIsLeft(true);
    else setIsLeft(false);
  };

  return (
    <div>
      <div
        ref={infoRef}
        className="absolute top-0 right-0 p-2 z-10 clickable text-gray-300 hover:text-gray-500"
        onClick={() => setIsOpened(!isOpened)}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </div>
      <div
        ref={modalRef}
        className={`
          ${isOpened ? "block" : "hidden"}
          ${isLeft ? "mr-7" : "-mr-[10.5rem]"}
          absolute top-2 right-0 w-40  bg-white rounded-lg
          z-10 p-2 shadow-lg`}
      >
        <p className="text-sm text-gray-600 leading-4">{description}</p>
      </div>
    </div>
  );
}
