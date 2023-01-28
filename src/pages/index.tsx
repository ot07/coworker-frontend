import { Inter } from "@next/font/google";
import { Header } from "@/components/Header/Header";
import { NavbarNested } from "@/components/NavbarNested/NavbarNested";
import { AppShell, Navbar } from "@mantine/core";

export default function Home() {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarNested />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
    </AppShell>
  );
}
