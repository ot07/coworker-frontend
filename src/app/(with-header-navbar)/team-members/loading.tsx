"use client";

import { Group, Skeleton } from "@mantine/core";

export default function Loading() {
  return (
    <div className="h-screen">
      <Group mb="sm" position="right">
        <Skeleton width="50%" height={36} />
      </Group>
      <Skeleton height={360} />
    </div>
  );
}
