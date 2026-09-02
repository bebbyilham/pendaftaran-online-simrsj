import React, { Children, useState, useRef, useEffect } from "react";
import propTypes from "prop-types";

export default function Select({
  labelName,
  id,
  name,
  value,
  className,
  children,
  onClick,
  fallbackText,
  icon: Icon,
  isRequired,
}) {
  const [toggle, settoggle] = useState(() => false);
  const selectWrapper = useRef(null);

  const items = Children.toArray(children);

  function toggleSelect() {
    settoggle(() => !toggle);
  }

  function clickOutside(event) {
    if (selectWrapper && !selectWrapper.current.contains(event.target))
      settoggle(false);
  }

  useEffect(() => {
    window.addEventListener("mousedown", clickOutside);
    return () => {
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  const selected = items.find((item) => item.props.value === value);

  return (
    <div className="flex flex-col mb-4 w-full">
      {labelName && (
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
          {labelName}
          {isRequired && <span className="text-red-500 ml-1 font-bold">*</span>}
        </label>
      )}
      <div className="relative" ref={selectWrapper}>
        <div
          onClick={toggleSelect}
          className={[
            "flex justify-between items-center cursor-pointer w-full h-11 bg-gray-50 hover:bg-white border text-sm rounded-xl transition-all duration-200 focus:outline-none shadow-sm",
            Icon ? "pl-11 pr-4" : "px-4",
            toggle
              ? "border-blue-500 ring-2 ring-blue-100 bg-white"
              : "border-gray-300 hover:border-gray-400 text-gray-800",
            className,
          ].join(" ")}
        >
          {Icon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <span className={value === "" || !value ? "text-gray-400" : "text-gray-900 font-medium truncate"}>
            {selected?.props.children ?? fallbackText}
          </span>
          <svg
            className={[
              "w-4 h-4 text-gray-400 transition-transform duration-200 ml-2 flex-shrink-0",
              toggle ? "transform rotate-180 text-blue-500" : "",
            ].join(" ")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {toggle && (
          <div className="absolute left-0 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl py-1 mt-1.5 max-h-64 overflow-y-auto ring-1 ring-black/5">
            {items.map((item, index) => {
              const isSelected = item.props.value === value;
              return (
                <div
                  key={index}
                  className={[
                    "cursor-pointer px-4 py-2.5 text-sm transition-colors duration-100 flex items-center justify-between",
                    isSelected
                      ? "bg-blue-50/80 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50",
                  ].join(" ")}
                  onClick={() => {
                    onClick({ target: { name: name, value: item.props.value } });
                    settoggle(false);
                  }}
                >
                  <span className="truncate">{item.props.children}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 ml-2"></span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

Select.prototype = {
  onClick: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  name: propTypes.string.isRequired,
  fallbackText: propTypes.string,
  labelName: propTypes.string,
  id: propTypes.string,
  className: propTypes.string,
  icon: propTypes.elementType,
  isRequired: propTypes.bool,
};
