import React from "react";
import propTypes from "prop-types";

export default function Input({
  value,
  error,
  name,
  onChange,
  placeholder,
  labelName,
  inputClassName,
  type,
  readOnly,
  isRequired,
}) {
  return (
    <div className="flex flex-col mb-2">
      {labelName && (
        <label
          htmlFor={name}
          className={[
            "block text-sm font-medium text-gray-700",
            error ? "text-red-600" : "text-gray-900",
          ].join(" ")}
        >
          {labelName}
        </label>
      )}
      <input
        name={name}
        onChange={onChange}
        type={type}
        className={[
          "bg-white focus:outline-none border w-full px-5 py-2 mt-1 shadow-sm sm:text-sm border-gray-300 rounded-md  ",
          error
            ? "border-red-600 text-red-600"
            : "focus:border-blue-500 border-gray-300 text-gray-600",
          inputClassName,
        ].join(" ")}
        value={value}
        placeholder={placeholder ?? "Please change placeholder"}
        readOnly={readOnly}
      />
      <span className="text-xs text-red-600">{error}</span>
    </div>
  );
}

Input.propTypes = {
  error: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  placeholder: propTypes.string,
  labelName: propTypes.string,
  inputClassName: propTypes.string,
  type: propTypes.oneOf(["text", "email", "password", "number"]),
  readOnly: propTypes.oneOf(["true", "false"]),
  required: propTypes.oneOf(["true", "false"]),
};
