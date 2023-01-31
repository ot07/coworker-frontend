import { Header } from "@/components/Header/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { AppShell, Title } from "@mantine/core";
import { AccountForms } from "@/components/AccountForms/AccountForms";

export default function Home() {
  return (
    <>
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
        <div className="mx-auto max-w-[32rem]">
          <Title order={2} mt={8} mb={16}>
            アカウント情報
          </Title>

          <AccountForms />
        </div>
      </AppShell>
    </>
  );
}
