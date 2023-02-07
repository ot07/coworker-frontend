"use client";

import {
  Button,
  Group,
  ActionIcon,
  createStyles,
  Badge,
  Skeleton,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons";
import {
  Member,
  useListMembers,
} from "@/app/(with-header-navbar)/team-members/useMembers";
import dayjs from "dayjs";

const useStyles = createStyles((theme) => ({
  row: {
    color: theme.colors.gray[7],
  },
  badgeTeal: {
    border: 0,
    backgroundColor: theme.colors.teal[0],
    color: theme.colors.teal[8],
    textTransform: "capitalize",
    fontFamily: "initial",
    padding: theme.spacing.xs,
  },
  badgeGray: {
    border: 0,
    backgroundColor: theme.colors.gray[2],
    color: theme.colors.gray[8],
    textTransform: "capitalize",
    fontFamily: "initial",
    padding: theme.spacing.xs,
  },
}));

export default function TeamMembers() {
  const { classes } = useStyles();
  const { members, isLoading } = useListMembers();
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [page, setPage] = useState(1);

  return (
    <>
      {isLoading && (
        <Group mb="sm" position="right">
          <Skeleton width="50%" height={36} />
        </Group>
      )}
      {!isLoading && (
        <Group mb="sm" position="right">
          <Button
            leftIcon={<IconPlus size={16} />}
            onClick={() => alert("工事中")}
          >
            データを追加
          </Button>
          <Button
            leftIcon={<IconTrash size={16} />}
            color="red"
            disabled={!selectedMembers.length}
            onClick={() => alert("工事中")}
          >
            選択したデータを削除
          </Button>
        </Group>
      )}
      <Skeleton visible={isLoading}>
        <DataTable
          minHeight={!members || !members.length ? 320 : undefined}
          records={members}
          withBorder
          striped
          borderRadius="md"
          shadow="sm"
          horizontalSpacing="xl"
          verticalSpacing="sm"
          rowClassName={classes.row}
          columns={[
            { accessor: "fullName", title: "名前", width: "40%" },
            { accessor: "email", title: "Eメールアドレス", width: "60%" },
            {
              accessor: "status",
              title: "ステータス",
              width: 120,
              render: ({ status }: Member) => {
                return status === "active" ? (
                  <Badge
                    variant="dot"
                    className={classes.badgeTeal}
                    color="teal"
                  >
                    {status}
                  </Badge>
                ) : (
                  <Badge
                    variant="dot"
                    className={classes.badgeGray}
                    color="gray"
                  >
                    {status}
                  </Badge>
                );
              },
            },
            {
              accessor: "dateAdded",
              title: "追加日",
              width: 120,
              render: (member: Member) =>
                dayjs(member.dateAdded).format("YYYY/MM/DD"),
            },
            {
              accessor: "actions",
              title: "",
              render: () => (
                <ActionIcon color="gray" onClick={() => alert("工事中")}>
                  <IconPencil size={22} />
                </ActionIcon>
              ),
            },
          ]}
          selectedRecords={selectedMembers}
          onSelectedRecordsChange={setSelectedMembers}
          noRecordsText="データがありません"
          totalRecords={5}
          recordsPerPage={5}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </Skeleton>
    </>
  );
}
