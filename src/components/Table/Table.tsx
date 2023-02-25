import { ChangeEvent, ReactNode, useState } from 'react'
import {
  createStyles,
  Table as MantineTable,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Checkbox,
  Button,
  Flex,
  Popover,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconGripVertical,
} from '@tabler/icons'
import { useListState } from '@mantine/hooks'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { SortableList } from '@/components/Table/SortableList'

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  checkbox: {
    input: {
      cursor: 'pointer',
    },
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },

  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}))

interface RowData {
  id: string
  name: string
  email: string
  company: string
}

interface TableProps {
  data: RowData[]
}

interface ThProps {
  children: ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles()
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton
        onClick={onSort}
        className={classes.control}
        tabIndex={-1}
      >
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  )
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy])
      }

      return a[sortBy].localeCompare(b[sortBy])
    }),
    payload.search
  )
}

interface SelectColumnsMenuProps {
  data: {
    position: number
    mass: number
    symbol: string
    name: string
  }[]
}

const columns = {
  data: [
    {
      position: 6,
      mass: 12.011,
      symbol: 'C',
      name: 'Carbon',
    },
    {
      position: 7,
      mass: 14.007,
      symbol: 'N',
      name: 'Nitrogen',
    },
    {
      position: 39,
      mass: 88.906,
      symbol: 'Y',
      name: 'Yttrium',
    },
    {
      position: 56,
      mass: 137.33,
      symbol: 'Ba',
      name: 'Barium',
    },
    {
      position: 58,
      mass: 140.12,
      symbol: 'Ce',
      name: 'Cerium',
    },
  ],
}

function SelectColumnsMenu() {
  const { classes, cx } = useStyles()
  const [state, handlers] = useListState(columns.data)

  const items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          <Text className={classes.symbol}>{item.symbol}</Text>
          <div>
            <Text>{item.name}</Text>
            <Text color="dimmed" size="sm">
              Position: {item.position} • Mass: {item.mass}
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  ))

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export function Table({ data }: TableProps) {
  const { classes, cx } = useStyles()
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const [selection, setSelection] = useState(['1'])

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false

    if (!reversed && sortBy === field) {
      setReverseSortDirection(false)
      setSortBy(null)
      setSortedData(sortData(data, { sortBy: null, reversed: false, search }))
    } else {
      setReverseSortDirection(reversed)
      setSortBy(field)
      setSortedData(sortData(data, { sortBy: field, reversed, search }))
    }
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

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

  const rows = sortedData.map((row) => {
    const selected = selection.includes(row.id)
    return (
      <tr key={row.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            className={classes.checkbox}
            checked={selection.includes(row.id)}
            onChange={() => toggleRow(row.id)}
            transitionDuration={0}
          />
        </td>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.company}</td>
      </tr>
    )
  })

  return (
    <Group>
      <ScrollArea>
        <Flex>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
          />
          <Popover>
            <Popover.Target>
              <Button>表示する列を選択</Button>
            </Popover.Target>
            <Popover.Dropdown>
              <SortableList />
            </Popover.Dropdown>
          </Popover>
        </Flex>
        <MantineTable
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: 'fixed', minWidth: 700 }}
        >
          <thead>
            <tr>
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
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                名前
              </Th>
              <Th
                sorted={sortBy === 'email'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('email')}
              >
                メールアドレス
              </Th>
              <Th
                sorted={sortBy === 'company'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('company')}
              >
                会社
              </Th>
            </tr>
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
    </Group>
  )
}
