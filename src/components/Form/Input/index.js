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
  type = "text",
  readOnly,
  isRequired,
  icon: Icon,
  helperText,
}) {
  return (
    <div className="flex flex-col mb-4 w-full">
      {labelName && (
        <label
          htmlFor={name}
          className={[
            "block text-xs font-bold uppercase tracking-wider mb-1.5",
            error ? "text-red-600" : "text-gray-700",
          ].join(" ")}
        >
          {labelName}
          {isRequired && <span className="text-red-500 ml-1 font-bold">*</span>}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {Icon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={name}
          name={name}
          onChange={onChange}
          type={type}
          className={[
            "w-full h-11 bg-gray-50 hover:bg-white focus:bg-white border text-sm rounded-xl transition-all duration-200 focus:outline-none shadow-sm",
            Icon ? "pl-11 pr-4" : "px-4",
            readOnly
              ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed font-medium"
              : "border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-400",
            error
              ? "border-red-400 text-red-700 focus:ring-red-100 focus:border-red-500 bg-red-50"
              : "",
            inputClassName,
          ].join(" ")}
          value={value}
          placeholder={placeholder ?? "Masukkan data"}
          readOnly={readOnly}
        />
      </div>
      {helperText && !error && (
        <span className="text-[11px] text-gray-400 mt-1 font-normal">{helperText}</span>
      )}
      {error && <span className="text-xs text-red-600 mt-1 font-medium">{error}</span>}
    </div>
  );
}

Input.propTypes = {
  error: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  placeholder: propTypes.string,
  labelName: propTypes.string,
  inputClassName: propTypes.string,
  type: propTypes.string,
  readOnly: propTypes.bool,
  isRequired: propTypes.bool,
  icon: propTypes.elementType,
  helperText: propTypes.string,
};

