import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  size?: string;
};

const Container = ({ children, className = "", size = "max-w-4xl" }: Props) => {
  return (
    <div className={`${className && className + " "}${size} mx-auto`}>
      {children}
    </div>
  );
};

export default Container;
