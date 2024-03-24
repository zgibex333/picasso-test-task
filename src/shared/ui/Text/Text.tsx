import { HTMLAttributes } from "react";

type TextTypes = "title" | "text";

type Props = {
  type?: TextTypes;
} & HTMLAttributes<HTMLParagraphElement>;

const MapTypeToTag: Record<
  TextTypes,
  keyof Pick<JSX.IntrinsicElements, "p" | "h2">
> = {
  text: "p",
  title: "h2",
};

export const Text = ({ type = "text", children, ...rest }: Props) => {
  const Tag = MapTypeToTag[type];
  return <Tag {...rest}>{children}</Tag>;
};
