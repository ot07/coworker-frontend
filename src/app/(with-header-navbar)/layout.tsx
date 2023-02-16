import { AppShell } from "./AppShell";
import { ReactNode } from "react";

export default function WithHeaderNavbarLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
