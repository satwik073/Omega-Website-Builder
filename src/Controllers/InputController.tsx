import React from "react";

interface EnhancedInputProps {
  Placeholder?: string;
  Value?: string;
  ReadOnly? : boolean,
  Data? : any,
  Type?: "TEXT" | "PASSWORD" | "EMAIL" | "NUMBER" | "URL" | "TEL";
  CustomClasses?: string;
  DarkMode?: boolean;
  OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EnhancedInput: React.FC<EnhancedInputProps> = ({
  Placeholder = "Enter text",
  Value = "",
  ReadOnly ,
  Data ,
  Type = "TEXT",
  CustomClasses = "",
  DarkMode = false,
  OnChange,
}) => {
  const baseClasses =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring";
  const lightModeClasses = "border-gray-300 focus:ring-gray-200";
  const darkModeClasses = "border-gray-600 bg-gray-800 text-white focus:ring-gray-600";

  const appliedClasses = `${baseClasses} ${
    DarkMode ? darkModeClasses : lightModeClasses
  } ${CustomClasses}`;

  const inputType = Type.toLowerCase() as React.HTMLInputTypeAttribute;

  return (
    <input
      placeholder={Placeholder}
      value={Value}
      {...Data}
      readOnly={ReadOnly}
      type={inputType}
      onChange={OnChange}
      className={appliedClasses}
    />
  );
};

export default EnhancedInput;
