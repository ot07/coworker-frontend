import { Navbar, ScrollArea, createStyles } from "@mantine/core";
import { IconCalendarStats, IconTable, IconUser } from "@tabler/icons";
import { LinksGroup } from "../NavbarLinksGroup/NavbarLinksGroup";

const mockdata = [
  {
    label: "アカウント",
    icon: IconUser,
    links: [
      { label: "ログイン画面（工事中）", link: "/" },
      { label: "アカウント情報（工事中）", link: "/" },
    ],
  },
  {
    label: "テーブル（工事中）",
    icon: IconTable,
  },
  { label: "カレンダー（工事中）", icon: IconCalendarStats },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
}));

export function Sidebar() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar width={{ sm: 300 }} px="md" className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
