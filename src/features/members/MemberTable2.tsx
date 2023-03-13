import { Table, Column } from '@/components/Table'
import { Member, useGetMembers } from '@/features/members/useMembers'
import { useState } from 'react'
import dayjs from 'dayjs'

export const MembersTable2 = () => {
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
  const { data, isLoading, error } = useGetMembers(
    pagination.page,
    pagination.pageSize
  )

  const columns: Column<Member>[] = [
    {
      key: 'fullName',
      header: '名前',
    },
    {
      key: 'email',
      header: 'メールアドレス',
    },
    {
      key: 'dateAdded',
      header: '追加日',
      render: ({ dateAdded }) => dayjs(dateAdded).format('YYYY/MM/DD'),
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
