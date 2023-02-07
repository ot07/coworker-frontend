"use client";

import { Box, Title } from "@mantine/core";

export default function AccountSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box mx="auto" className="max-w-[32rem]">
      <Title order={2} mt={8} mb={16}>
        アカウント設定
      </Title>
      {children}
    </Box>
  );
}
