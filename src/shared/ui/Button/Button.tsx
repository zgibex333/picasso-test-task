import { ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...rest}>{children}</button>;
};
