import { Table, TableColumn } from '@/components/Table'
import { Member, useGetMembers } from '@/features/members/useMembers'
import { useState } from 'react'
import dayjs from 'dayjs'

export const MembersTable2 = () => {
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
  const { data, isLoading, error } = useGetMembers(
    pagination.page,
    pagination.pageSize
  )

  const columns: TableColumn<Member>[] = [
    {
      id: 'fullName',
      header: '名前',
      cell: (row) => row.renderValue(),
      accessorKey: 'fullName',
    },
    {
      id: 'email',
      header: 'メールアドレス',
      cell: (row) => row.renderValue(),
      accessorKey: 'email',
    },
    {
      id: 'dateAdded',
      header: '追加日',
      cell: (row) => dayjs(row.renderValue()).format('YYYY/MM/DD'),
      accessorKey: 'dateAdded',
    },
  ]

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    throw new Error(error.message)
  }

  return (
    <Table
      data={data?.data || []}
      columns={columns}
      totalCount={data?.meta.totalCount || 0}
      pagination={pagination}
      pageSizeOptions={[5, 10, 20]}
      onPaginationChange={setPagination}
      tableViewportHeight={300}
    />
  )
}
