import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableColumn } from './Table'
import { FC, useCallback, useLayoutEffect, useState } from 'react'
import { createId } from '@paralleldrive/cuid2'

type Item = {
  id: string
  name: string
  price: number
  quantity: number
}

const columns: TableColumn<Item>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: (row) => row.renderValue(),
    accessorKey: 'name',
  },
  {
    id: 'price',
    header: 'Price',
    cell: (row) => row.renderValue(),
    accessorKey: 'price',
  },
  {
    id: 'quantity',
    header: 'Quantity',
    cell: (row) => row.renderValue(),
    accessorKey: 'quantity',
  },
]

const dummyData = (size: number) => {
  const items = []
  for (let i = 0; i < size; i++) {
    const id = createId()
    items.push({
      id,
      name: `Item ${id}`,
      price: 100 * i,
      quantity: i + 1,
    })
  }
  return items
}

const Wrapper: FC = () => {
  const [totalCount] = useState(100)
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
  const [data, setData] = useState(dummyData(pagination.pageSize))

  useLayoutEffect(() => {
    setData(dummyData(pagination.pageSize))
  }, [pagination])

  const handleSearch = useCallback((query: string) => alert(query), [])

  return (
    <Table
      data={data}
      columns={columns}
      totalCount={totalCount}
      pagination={pagination}
      pageSizeOptions={[10, 20, 30]}
      onPaginationChange={setPagination}
      onSearch={handleSearch}
      tableViewportHeight={300}
    />
  )
}

const meta: Meta<typeof Wrapper> = {
  title: 'Example/Table',
  component: Wrapper,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Wrapper>

export const Basic: Story = {
  args: {},
}
