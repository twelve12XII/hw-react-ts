import React from "react";

interface InputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  pattern?: string;
  title: string | undefined;
}
export default function Input({
  name,
  pattern,
  title,
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <>
      <input
        pattern={pattern}
        title={title}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}
