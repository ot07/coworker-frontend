import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  Skeleton,
} from '@mantine/core'
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons'
import { DataTable } from 'mantine-datatable'
import dayjs from 'dayjs'
import { useCallback, useLayoutEffect, useState } from 'react'
import {
  Member,
  useCreateMember,
  useDeleteMembers,
  useGetMembers,
} from './useMembers'
import { CreateModal } from './CreateModal'

const useStyles = createStyles((theme) => ({
  row: {
    color: theme.colors.gray[7],
  },
  badgeTeal: {
    border: 0,
    backgroundColor: theme.colors.teal[0],
    color: theme.colors.teal[8],
    textTransform: 'capitalize',
    fontFamily: 'initial',
    padding: theme.spacing.xs,
  },
  badgeGray: {
    border: 0,
    backgroundColor: theme.colors.gray[2],
    color: theme.colors.gray[8],
    textTransform: 'capitalize',
    fontFamily: 'initial',
    padding: theme.spacing.xs,
  },
}))

export const MembersTable = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  const { classes } = useStyles()
  const { data, isLoading } = useGetMembers(page, pageSize)
  const { createMember } = useCreateMember(page, pageSize)
  const { deleteMembers } = useDeleteMembers(page, pageSize)
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([])

  const openModal = useCallback(() => {
    setIsOpenCreateModal(true)
  }, [setIsOpenCreateModal])

  const deleteSelectedMembers = useCallback(() => {
    const ids = selectedMembers.map((member) => member.id)
    deleteMembers(ids)
    setSelectedMembers([])
  }, [selectedMembers, deleteMembers])

  useLayoutEffect(() => {
    if (data !== undefined && page > data.meta.pageCount) {
      setPage(data.meta.pageCount)
    }
  }, [page, data])

  return (
    <>
      {
        <Group mb="sm" position="right">
          {isLoading ? (
            <Skeleton width="50%" height={36} />
          ) : (
            <>
              <Button leftIcon={<IconPlus size={16} />} onClick={openModal}>
                ??????????????????
              </Button>
              <Button
                leftIcon={<IconTrash size={16} />}
                color="red"
                disabled={!selectedMembers.length}
                onClick={deleteSelectedMembers}
              >
                ??????????????????????????????
              </Button>
            </>
          )}
        </Group>
      }
      {isLoading ? (
        <Skeleton height={360} />
      ) : (
        <DataTable
          minHeight={!data?.data || !data.data.length ? 320 : undefined}
          records={data?.data}
          withBorder
          striped
          borderRadius="md"
          shadow="sm"
          horizontalSpacing="xl"
          verticalSpacing="sm"
          rowClassName={classes.row}
          columns={[
            { accessor: 'fullName', title: '??????', width: '50%' },
            { accessor: 'email', title: 'E?????????????????????', width: '50%' },
            {
              accessor: 'dateAdded',
              title: '?????????',
              width: 160,
              render: (member: Member) =>
                dayjs(member.dateAdded).format('YYYY/MM/DD'),
            },
            {
              accessor: 'actions',
              title: '',
              render: () => (
                <ActionIcon color="gray" onClick={() => alert('?????????')}>
                  <IconPencil size={22} />
                </ActionIcon>
              ),
            },
          ]}
          selectedRecords={selectedMembers}
          onSelectedRecordsChange={setSelectedMembers}
          noRecordsText="???????????????????????????"
          totalRecords={data?.meta.totalCount || 0}
          recordsPerPage={data?.meta.pageSize || 0}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      )}
      <CreateModal
        isOpen={isOpenCreateModal}
        setIsOpen={setIsOpenCreateModal}
        createMember={createMember}
      />
    </>
  )
}
