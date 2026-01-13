import { ReactNode } from "react";
import "./Header.css";

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return <div className="pageHeader">{children}</div>;
}

export default Header;
