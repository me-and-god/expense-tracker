import type { ReactNode } from "react";
import "../globals.css";

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div>{children}</div>;
}