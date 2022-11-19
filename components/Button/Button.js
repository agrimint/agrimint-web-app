// import { useState } from "react";
import { cva } from "class-variance-authority";

const buttonStyles = cva(`
  inline-block 
  px-6 py-2.5 
  mb-5
  bg-teal-600
  text-white font-medium text-base leading-tight 
  rounded-[6px]
  hover:bg-teal-700 
  focus:bg-teal-700 focus:outline-none focus:ring-0
  active:bg-teal-700 
  transition duration-150 ease-in-out`, 
  {
    variants: {
      intent: {
        primary: "bg-teal-600 text-white",
        secondary: "bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 active:bg-teal-500",
        transparent: "text-teal-800 font-normal bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent py-0"
      },
      disabled: {
        true: "disabled:bg-gray-100 disabled:text-gray-400"
      },
      fullWidth: {
        true: "w-full"
      },
      // size: {
      //   small: ["text-sm", "py-1", "px-2"],
      //   medium: ["text-base", "py-2", "px-4"],
      // },
    },
    // compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase" }],
    defaultVariants: {
      intent: "primary",
      fullWidth: true,
    },
  }
);

const Button = ({
  onClick,
  label,
  intent,
  disabled,
  fullWidth
}) => {
  return (
    <button
      {...{
        className: buttonStyles({ intent, disabled, fullWidth }),
        type: "button",
        onClick,
        disabled,
      }}
    >{label}
    </button>
  );
};

export default Button;
