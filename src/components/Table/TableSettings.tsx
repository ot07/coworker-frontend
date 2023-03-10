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
import { FC } from 'react'

type DisplayColumnCardProps = {
  label: string
}

const DisplayColumnCard: FC<DisplayColumnCardProps> = ({ label }) => {
  const { classes } = useStyles()

  return (
    <Group className={classes.displayColumnCard}>
      <div style={{ flex: 1 }}>
        <Group spacing="sm">
          <Checkbox className={classes.checkbox} />
          <Text fz="sm" fw={500}>
            {label}
          </Text>
        </Group>
      </div>
      <UnstyledButton className={classes.dragButton}>
        <IconGripVertical className="h-4" />
      </UnstyledButton>
    </Group>
  )
}

type TableSettingsProps = {
  columns: string[]
}

export const TableSettings: FC<TableSettingsProps> = ({ columns }) => {
  return (
    <Stack spacing="xs">
      <Stack spacing={4}>
        <Text fz="xs" c="dimmed" px={8}>
          表示する列
        </Text>
        <Stack spacing={0}>
          {columns.map((column) => (
            <DisplayColumnCard key={column} label={column} />
          ))}
        </Stack>
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
