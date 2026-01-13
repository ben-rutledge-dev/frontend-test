import { ReactNode } from "react";
import "./Title.css";

interface TitleProps {
  children: ReactNode;
}

function Title({ children }: TitleProps) {
  return <h1 className="pageTitle">{children}</h1>;
}

export default Title;
