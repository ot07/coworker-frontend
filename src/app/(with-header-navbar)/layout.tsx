"use client";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { AppShell } from "@mantine/core";

export default function WithHeaderNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      padding="md"
      header={<Header />}
      navbar={<Sidebar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
