import { Header } from "@/components/Header/Header";
import { NavbarNested } from "@/components/NavbarNested/NavbarNested";
import { AppShell, Title } from "@mantine/core";
import { MantineForms } from "@/components/MantineForms/MantineForms";
import { RHFMantineForms } from "@/components/RHFMantineForms/RHFMantineForms";
import { NavbarSimple } from "@/components/NavbarSimple/NavbarSimple";
import { NavbarSimpleMinimal } from "@/components/NavbarSimpleMinimal/NavbarSimpleMinimal";

export default function Home() {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarSimple />}
      // navbar={<NavbarSimpleMinimal />}
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
      <div className="mx-auto max-w-[32rem]">
        <Title order={2} mt={8} mb={16}>
          アカウント情報
        </Title>

        <MantineForms />
        <RHFMantineForms />
      </div>
    </AppShell>
  );
}
