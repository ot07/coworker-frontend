import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import {
  createStyles,
  Group,
  ScrollArea,
  Table as MantineTable,
  Text,
  rem,
  UnstyledButton,
  Center,
} from '@mantine/core'
import { FC, ReactNode } from 'react'
import { IconSelector } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}))

type ThProps = {
  children: ReactNode
}

const Th: FC<ThProps> = ({ children }) => {
  const { classes } = useStyles()
  const Icon = IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

export type TableColumn<TData> = ColumnDef<TData>

export type TableProps<TData extends object> = {
  data: TData[]
  columns: TableColumn<TData>[]
}

export const Table = <TData extends object>({
  data,
  columns,
}: TableProps<TData>): JSX.Element => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const rows = table.getRowModel().rows.map((row) => (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  ))

  return (
    <ScrollArea>
      <MantineTable
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: 'fixed' }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </MantineTable>
    </ScrollArea>
  )
}
