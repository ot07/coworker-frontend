"use client";

import { TeamMembersTable } from "./TeamMembersTable";
import { Box, Title } from "@mantine/core";

export default function TeamMembers() {
  return (
    <Box mx="auto" className="max-w-[48rem]">
      <Title order={2} mt={8} mb={16}>
        メンバー一覧
      </Title>
      <TeamMembersTable />
    </Box>
  );
}
