import {
  CalendarIcon,
  TableCellsIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons";

import { Box, NavLink } from "@mantine/core";
import { IconGauge, IconFingerprint } from "@tabler/icons";

import { Accordion } from "@mantine/core";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <Box sx={{ width: 240 }} className="border-r">
      <NavLink
        label="アカウント"
        icon={<UserIcon width={18} strokeWidth={1.5} />}
        childrenOffset={20}
        classNames={{ icon: "mr-2 text-gray-700", label: "text-gray-700" }}
      >
        <NavLink
          pl={16}
          label={
            <Link href="/" className="block">
              ログイン画面
            </Link>
          }
          className="border-l border-solid border-blue-500 bg-sky-100 font-bold text-blue-500 hover:bg-sky-100"
        />
        <NavLink
          pl={16}
          label={<Link href="/">アカウント情報</Link>}
          className="border-l border-solid border-gray-200 text-gray-700"
        />
      </NavLink>

      <NavLink
        label="テーブル"
        icon={<TableCellsIcon width={18} strokeWidth={1.5} />}
        childrenOffset={20}
        classNames={{ icon: "mr-2 text-gray-700", label: "text-gray-700" }}
      />

      <NavLink
        label="カレンダー"
        icon={<CalendarIcon width={18} strokeWidth={1.5} />}
        childrenOffset={20}
        classNames={{ icon: "mr-2 text-gray-700", label: "text-gray-700" }}
      >
        <NavLink
          pl={16}
          label={<Link href="/">シフト表</Link>}
          className="border-l border-solid border-gray-200 text-gray-700"
        />
        <NavLink
          pl={16}
          label={<Link href="/">予定カレンダー</Link>}
          className="border-l border-solid border-gray-200 text-gray-700"
        />
      </NavLink>
    </Box>
  );
};
