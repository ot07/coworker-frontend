import {
  AppShell,
  Title,
  Box,
  Paper,
  Center,
  Button,
  Group,
  ActionIcon,
  Text,
  createStyles,
} from "@mantine/core";
import { Header } from "@/components/Header/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons";
import dayjs from "dayjs";

type Status = "active" | "offline";

type Member = {
  id: string;
  name: string;
  status: Status;
  email: string;
  dateAdded: Date;
};

const members: Member[] = [
  {
    id: "1",
    name: "Olivia Rhye",
    status: "active",
    email: "olivia@example.com",
    dateAdded: new Date("2022-03-14"),
  },
  {
    id: "2",
    name: "Phoenix Baker",
    status: "active",
    email: "phoenix@example.com",
    dateAdded: new Date("2022-03-12"),
  },
  {
    id: "3",
    name: "Lana Steiner",
    status: "offline",
    email: "lana@example.com",
    dateAdded: new Date("2022-03-12"),
  },
  {
    id: "4",
    name: "Demi Wilkinson",
    status: "active",
    email: "demi@example.com",
    dateAdded: new Date("2022-03-14"),
  },
  {
    id: "5",
    name: "Candice Wu",
    status: "offline",
    email: "candice@example.com",
    dateAdded: new Date("2022-03-13"),
  },
];

const useStyles = createStyles((theme) => ({
  row: {
    color: theme.colors.gray[7],
  },
}));

export default function TeamMembers() {
  const { classes } = useStyles();
  const [selectedRecords, setSelectedRecords] = useState<Member[]>([]);
  console.log("selectedRecords:", selectedRecords);

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
      <Box mx="auto" className="max-w-[48rem]">
        <Title order={2} mt={8} mb={16}>
          メンバー一覧
        </Title>
        <DataTable
          minHeight={members.length > 0 ? 0 : 320}
          records={members}
          withBorder
          striped
          borderRadius="md"
          shadow="sm"
          horizontalSpacing="xl"
          verticalSpacing="md"
          rowClassName={classes.row}
          columns={[
            { accessor: "name", title: "名前", width: "40%" },
            { accessor: "status", title: "ステータス", width: "60%" },
            { accessor: "email", title: "Eメールアドレス", width: 160 },
            {
              accessor: "dateAdded",
              title: "追加日",
              width: 96,
              render: (member: Member) =>
                dayjs(member.dateAdded).format("YYYY/MM/DD"),
            },
            {
              accessor: "actions",
              title: "",
              render: () => (
                <Group spacing={3} position="right" noWrap>
                  <ActionIcon color="blue">
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red">
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              ),
            },
          ]}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          noRecordsText="データがありません"
        />
        <Paper my="xl" py="xl" withBorder radius={0}>
          <Center>
            <Button
              uppercase
              leftIcon={<IconTrash size={16} />}
              color="red"
              disabled={!selectedRecords.length}
              onClick={() => alert("delete")}
            >
              {selectedRecords.length
                ? `Delete ${
                    selectedRecords.length === 1
                      ? "one selected record"
                      : `${selectedRecords.length} selected records`
                  }`
                : "Select records to delete"}
            </Button>
          </Center>
        </Paper>
      </Box>
    </AppShell>
  );
}
