import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableColumn } from './Table'
import { FC, useLayoutEffect, useState } from 'react'
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
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount] = useState(100)
  const [data, setData] = useState(dummyData(pageSize))

  useLayoutEffect(() => {
    setData(dummyData(pageSize))
  }, [page, pageSize])

  return (
    <Table
      data={data}
      columns={columns}
      totalCount={totalCount}
      page={page}
      pageSize={pageSize}
      onPageChange={(p) => setPage(p)}
      onPageSizeChange={(p) => setPageSize(p)}
      pageSizeOptions={[10, 20, 30]}
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
