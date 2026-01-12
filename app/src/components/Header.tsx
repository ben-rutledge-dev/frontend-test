import { ReactNode } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return <div className={styles.pageHeader}>{children}</div>;
}

export default Header;
