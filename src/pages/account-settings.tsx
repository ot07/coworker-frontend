import { Header } from "@/components/Header/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { AppShell } from "@mantine/core";
import { AccountSettings } from "@/components/AccountSettings/AccountSettings";

export default function AccountSettingsPage() {
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
      <AccountSettings />
    </AppShell>
  );
}
