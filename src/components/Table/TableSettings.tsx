import {
  Button,
  Checkbox,
  Divider,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { useStyles } from './Table'
import { IconGripVertical } from '@tabler/icons'
import { FC, useState } from 'react'
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Column = {
  id: string
  label: string
}

type DisplayColumnCardProps = {
  column: Column
}

const DisplayColumnCard: FC<DisplayColumnCardProps> = ({ column }) => {
  const { classes } = useStyles()
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: column.id,
  })
  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
  }

  return (
    <Group
      ref={setNodeRef}
      className={classes.displayColumnCard}
      style={sortableStyle}
    >
      <div style={{ flex: 1 }}>
        <Group spacing="sm">
          <Checkbox className={classes.checkbox} />
          <Text fz="sm" fw={500}>
            {column.label}
          </Text>
        </Group>
      </div>
      <UnstyledButton
        className={classes.dragButton}
        {...attributes}
        {...listeners}
      >
        <IconGripVertical className="h-4" />
      </UnstyledButton>
    </Group>
  )
}

type DisplayColumnListProps = {
  columns: Column[]
}

const DisplayColumnList: FC<DisplayColumnListProps> = ({ columns }) => {
  const { setNodeRef } = useDroppable({ id: '1' })
  const [sortedColumns, setSortedColumns] = useState(columns)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const activeId = active.id
    const overId = over?.id

    if (!!overId && activeId !== overId) {
      setSortedColumns((items) => {
        const oldIndex = items.findIndex(({ id }) => id === activeId.toString())
        const newIndex = items.findIndex(({ id }) => id === overId.toString())
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={sortedColumns} strategy={rectSortingStrategy}>
        <Stack ref={setNodeRef} spacing={0}>
          {sortedColumns.map((column) => (
            <DisplayColumnCard key={column.id} column={column} />
          ))}
        </Stack>
      </SortableContext>
    </DndContext>
  )
}

type TableSettingsProps = {
  columns: Column[]
}

export const TableSettings: FC<TableSettingsProps> = ({ columns }) => {
  return (
    <Stack spacing="xs">
      <Stack spacing={4}>
        <Text fz="xs" c="dimmed" px={8}>
          表示する列
        </Text>
        <DisplayColumnList columns={columns} />
      </Stack>
      <Divider />
      <Stack>
        <Button variant="light" radius="md" mx={4} p={4}>
          CSVダウンロード
        </Button>
      </Stack>
    </Stack>
  )
}
