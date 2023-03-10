import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { getSortedRowModel } from '@tanstack/react-table'
import {
  createStyles,
  Group,
  ScrollArea,
  Table as MantineTable,
  Text,
  rem,
  UnstyledButton,
  Center,
  Checkbox,
  Pagination,
  TextInput,
  Title,
  Stack,
  Select,
} from '@mantine/core'
import { ChangeEvent, FC, MouseEventHandler, ReactNode, useState } from 'react'
import {
  IconAdjustments,
  IconDotsVertical,
  IconSearch,
  IconSelector,
} from '@tabler/icons-react'
import { HasIdObject } from '@/types/types'
import { IconChevronDown, IconChevronUp } from '@tabler/icons'

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

  checkbox: {
    input: {
      cursor: 'pointer',
    },
  },

  input: {
    minWidth: '18rem',
    input: {
      borderRadius: '0.5rem',
      border: '0.0625rem solid #dee2e6',
    },
  },

  button: {
    borderRadius: '0.5rem',
    height: '2.25rem',
  },

  searchButton: {
    color: theme.colors.gray[6],
    width: '2.25rem',
    height: '2.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      color: theme.colors.blue[6],
    },
  },

  iconButton: {
    borderRadius: '0.5rem',
    border: '0.0625rem solid #dee2e6',
    color: theme.colors.gray[6],
    width: '2.25rem',
    height: '2.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      color: theme.colors.blue[6],
    },
  },

  perPageSelect: {
    input: {
      borderRadius: '0.5rem',
      border: '0.0625rem solid #dee2e6',
      width: '3.75rem',
      height: '2rem',
      paddingRight: '1.5rem',
    },
  },
}))

type ThProps = {
  children: ReactNode
  sortable: boolean
  reversed: boolean
  sorted: boolean
  onSort?: MouseEventHandler<HTMLButtonElement>
}

const Th: FC<ThProps> = ({ children, sortable, reversed, sorted, onSort }) => {
  const { classes } = useStyles()
  const Icon = sortable
    ? sorted
      ? reversed
        ? IconChevronUp
        : IconChevronDown
      : IconSelector
    : undefined
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            {Icon && <Icon size="0.9rem" stroke={1.5} />}
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

export type TableColumn<TData> = ColumnDef<TData>

export type TableProps<TData extends HasIdObject> = {
  data: TData[]
  columns: TableColumn<TData>[]
}

export const Table = <TData extends HasIdObject>({
  data,
  columns,
}: TableProps<TData>): JSX.Element => {
  const { classes } = useStyles()
  const [searchQuery, setSearchQuery] = useState('')
  const [activePage, setPage] = useState(1)
  const [perPage, setPerPage] = useState<string | null>('10')
  const [selection, setSelection] = useState<string[]>([])

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )

  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const rows = table.getRowModel().rows.map((row) => {
    const rowId = row.original.id
    return (
      <tr key={rowId}>
        <td>
          <Checkbox
            className={classes.checkbox}
            checked={selection.includes(rowId)}
            onChange={() => toggleRow(rowId)}
            transitionDuration={0}
          />
        </td>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    )
  })

  return (
    <ScrollArea>
      <div className="overflow-hidden bg-white rounded-lg border">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
          <Group spacing="xs">
            <Stack align="flex-start" spacing={2}>
              <Title order={3}>タイトル</Title>
              <Text fz="sm" fw={300} c="dimmed">
                説明文...
              </Text>
            </Stack>
          </Group>
          <Group spacing="xs">
            <TextInput
              value={searchQuery}
              className={classes.input + ' ring-0 outline-0'}
              placeholder="検索..."
              rightSection={
                <UnstyledButton
                  className={classes.searchButton}
                  onClick={() => console.log('search:', searchQuery)}
                >
                  <IconSearch size="1rem" />
                </UnstyledButton>
              }
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  console.log('search:', searchQuery)
                }
              }}
            />
            <UnstyledButton className={classes.iconButton}>
              <IconAdjustments size="1.25rem" />
            </UnstyledButton>
            <UnstyledButton className={classes.iconButton}>
              <IconDotsVertical size="1.25rem" />
            </UnstyledButton>
          </Group>
        </div>
        <MantineTable
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          sx={{ tableLayout: 'fixed' }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th style={{ width: 40 }}>
                  <Checkbox
                    className={classes.checkbox}
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={
                      selection.length > 0 && selection.length !== data.length
                    }
                    transitionDuration={0}
                  />
                </th>
                {headerGroup.headers.map((header) => {
                  const sortable = header.column.getCanSort()
                  const isSorted = header.column.getIsSorted()

                  return (
                    <Th
                      key={header.id}
                      sortable={sortable}
                      reversed={isSorted === 'desc'}
                      sorted={!!isSorted}
                      onSort={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Th>
                  )
                })}
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

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2">
          <Group spacing={32}>
            <Group spacing={6}>
              <Text fz="md" pb={2}>
                100
              </Text>
              <Text fz="xs" c="dimmed">
                件中
              </Text>
              <Text fz="md" pb={2}>
                1
              </Text>
              <Text fz="xs" c="dimmed">
                件
              </Text>
              <Text fz="xs" c="dimmed">
                〜
              </Text>
              <Text fz="md" pb={2}>
                10
              </Text>
              <Text fz="xs" c="dimmed">
                件
              </Text>
            </Group>
            <Group spacing="xs">
              <Select
                className={classes.perPageSelect}
                value={perPage}
                onChange={setPerPage}
                data={[
                  { value: '10', label: '10' },
                  { value: '20', label: '20' },
                  { value: '30', label: '30' },
                ]}
              />
              <Text fz="xs" c="dimmed">
                件表示
              </Text>
            </Group>
          </Group>
          <Pagination value={activePage} onChange={setPage} total={10} />
        </div>
      </div>
    </ScrollArea>
  )
}
