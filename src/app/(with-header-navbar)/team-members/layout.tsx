"use client";

import { Box, Title } from "@mantine/core";

export default function TeamMembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box mx="auto" className="max-w-[48rem]">
      <Title order={2} mt={8} mb={16}>
        メンバー一覧
      </Title>
      {children}
    </Box>
  );
}
