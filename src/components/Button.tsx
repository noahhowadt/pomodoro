import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, ...props }: Props) {
  return (
    <button
      className="bg-white p-2 rounded-full shadow-sm shadow-black"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
