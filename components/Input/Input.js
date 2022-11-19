// import { useState } from "react";
import { cva } from "class-variance-authority";

const inputGroupStyles = "mb-5";

const inputLabelStyles = "form-label mb-2 text-gray-700";

const inputStyles = cva(`
  form-control
  block
  px-3 py-1.5
  text-base font-normal text-gray-700
  bg-white bg-clip-padding
  border-2 border-solid border-gray-300 rounded-[6px]
  transition ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`, 
  {
    variants: {
      disabled: {
        true: "bg-grey-100 text-gray-400"
      },
      fullWidth: {
        true: "w-full"
      },
      error: {
        true: "border-red-500 text-red-500"
      }
      // size: {
      //   small: ["text-sm", "py-1", "px-2"],
      //   medium: ["text-base", "py-2", "px-4"],
      // },
    },
    // compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase" }],
    defaultVariants: {
      // intent: "primary",
      fullWidth: true,
    },
  }
);

const Input = ({
  error,
  name,
  label,
  value,
  type,
  placeholder,
  onChange,
  disabled,
  fullWidth,
  isNumeric
}) => {
  return (
    <div className={inputGroupStyles}>
      <label className={inputLabelStyles}>{label}
        <input
          {...{
            className: inputStyles({ error, disabled, fullWidth }),
            name,
            value,
            type,
            placeholder,
            onChange,
            disabled,
          }}
        />
      </label>
    </div>
  );
};

export default Input;
