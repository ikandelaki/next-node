import { MouseEvent } from "react";

type ButtonTypes = {
  text: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function Button({ text, onClick, className }: ButtonTypes) {
  return (
    <button
      className={`cursor-pointer bg-dark-gray px-4 py-2 text-white rounded-lg ${className}`}
      onClick={onClick}
      aria-label={text}
    >
      {text}
    </button>
  );
}
