"use client";

import { Header } from "@/app/(with-header-navbar)/Header";
import { Sidebar } from "@/app/(with-header-navbar)/Sidebar";
import { AppShell as MantineAppShell } from "@mantine/core";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AppShell: FC<Props> = ({ children }) => {
  return (
    <MantineAppShell
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
    </MantineAppShell>
  );
};
