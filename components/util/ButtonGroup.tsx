import React from "react";

interface ButtonProps {
  type: "button";
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ButtonGroupProps {
  buttons: ButtonProps[];
}

export default function ButtonGroup({ buttons }: ButtonGroupProps) {
  return (
    <div className="w-full mt-3 flex flex-row justify-around flex-wrap gap-y-2">
      {buttons.map((item, index) => {
        return (
          <button
            key={index}
            className={`btn btn-primary btn-xs w-16 mx-1`}
            onClick={item.onClick}
          >
            {item.text}
          </button>
        );
      })}
    </div>
  );
}
