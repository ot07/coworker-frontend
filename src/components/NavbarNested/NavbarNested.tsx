import { Navbar, ScrollArea, createStyles } from "@mantine/core";
import { IconUser, IconTable, IconCalendar } from "@tabler/icons";
import { LinksGroup } from "../NavbarLinksGroup/NavbarLinksGroup";

const mockdata = [
  {
    label: "アカウント",
    icon: IconUser,
    initiallyOpened: true,
    links: [
      { label: "ログイン画面", link: "/", active: true },
      { label: "アカウント情報", link: "/" },
    ],
  },
  {
    label: "テーブル",
    icon: IconTable,
  },
  {
    label: "カレンダー",
    icon: IconCalendar,
    links: [
      { label: "予定カレンダー", link: "/" },
      { label: "シフト表", link: "/" },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },
}));

export function NavbarNested() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar width={{ sm: 300 }} px="md" className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
