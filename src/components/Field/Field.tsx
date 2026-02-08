"use client";

import { ChangeEvent } from "react";
import ChevronIcon from "../ChevronIcon";
import { OptionType } from "@/types/general";

export type FieldType = {
  type: string;
  id: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  isRequired?: boolean;
  className?: string;
  defaultValue?: string | number | string[];
  options?: OptionType[];
};

export default function Field({
  type,
  placeholder,
  value,
  onChange,
  id,
  label,
  name,
  isRequired,
  className,
  defaultValue,
  options,
}: FieldType) {
  if (!type) {
    return null;
  }

  const renderLabel = () => {
    if (!label) {
      return null;
    }

    return <label htmlFor={id}>{label}</label>;
  };

  const inputName = name ?? id;

  const renderTextInput = () => {
    if (!value || !onChange) {
      return (
        <input
          className="bg-navbar py-2 px-4 rounded-lg w-full"
          type={type}
          placeholder={placeholder}
          id={id}
          name={inputName}
          required={isRequired}
          defaultValue={defaultValue}
          // Temporarily disabling autoComplete, need to fix default white background on autofill inputs
          autoComplete="off"
        />
      );
    }

    return (
      <input
        className="bg-navbar py-2 px-4 rounded-lg w-full"
        type={type}
        placeholder={placeholder}
        id={id}
        name={inputName}
        value={value}
        onChange={onChange}
        required={isRequired}
        defaultValue={defaultValue}
      />
    );
  };

  const renderBooleanInput = () => {
    return (
      <>
        <select
          className="w-full bg-navbar py-2 px-4 rounded-lg"
          id={id}
          name={inputName}
          defaultValue={defaultValue === "true" ? 1 : 0}
        >
          <option value={1}>Yes</option>
          <option value={0}>No</option>
        </select>
        <span className="absolute translate-x-[-25px] translate-y-[10px]">
          <ChevronIcon />
        </span>
      </>
    );
  };

  const renderTextareaInput = () => {
    return (
      <textarea
        className="bg-navbar px-4 py-2 rounded-lg w-full"
        name={inputName}
        id={id}
        defaultValue={defaultValue}
      ></textarea>
    );
  };

  const renderAsterisk = () => {
    if (!isRequired) {
      return null;
    }

    return <span className="text-red-400 absolute translate-1/2">*</span>;
  };

  const renderMultiselectInput = () => {
    if (!options) {
      return null;
    }

    return (
      <>
        <select
          className="w-full bg-navbar py-2 px-4 rounded-lg custom-scrollbar"
          id={id}
          name={inputName}
          multiple
          defaultValue={options.filter((option) => option.isSelected).map((option) => String(option.id))}
        >
          {options.map((option) => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </>
    );
  };

  const renderMap: { [key: string]: () => React.ReactElement | null } = {
    text: renderTextInput,
    bool: renderBooleanInput,
    textarea: renderTextareaInput,
    multiselect: renderMultiselectInput,
  };

  const renderInput = () => {
    const renderer = renderMap[type];

    if (typeof renderer !== "function") {
      return null;
    }

    return renderer();
  };

  return (
    <div className={`Field Field_type_${type} grid grid-cols-2 items-center ${className}`} key={String(defaultValue)}>
      {renderLabel()}
      <div className="ml-auto relative w-full">
        {renderInput()}
        {renderAsterisk()}
      </div>
    </div>
  );
}
