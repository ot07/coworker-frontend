import {
  getGetMembersQueryKey,
  useGetMembers as useGetMembersQuery,
} from '@/api/endpoints/members/members'
import { useDeleteMembers as useDeleteMembersMutation } from '@/api/endpoints/members/members'
import { usePostMembers as usePostMemberMutation } from '@/api/endpoints/members/members'
import {
  ApiCreateMemberRequest,
  ApiListMembersResponse,
  ApiListMembersResponseMeta,
} from '@/api/model'
import { AxiosResponse } from 'axios'
import { Camelized } from 'humps'
import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { DeepRequired } from 'ts-essentials'

export interface Member {
  id: string
  fullName: string
  email: string
  dateAdded: Date
}

export interface QueryResultData {
  meta: Camelized<Required<ApiListMembersResponseMeta>>
  data: Member[]
}

const transformer = (
  response: AxiosResponse<Camelized<DeepRequired<ApiListMembersResponse>>, any>
): QueryResultData => {
  return {
    meta: response.data.meta,
    data: response.data.data.map(
      ({ id, firstName, lastName, email, createdAt }) => {
        return {
          id: id,
          fullName: `${firstName} ${lastName}`,
          email: email,
          dateAdded: new Date(createdAt),
        }
      }
    ),
  }
}

export const useGetMembers = (page: number, pageSize: number) => {
  return useGetMembersQuery<QueryResultData>(
    { page_id: page, page_size: pageSize },
    { query: { select: transformer, keepPreviousData: true } }
  )
}

export const useCreateMember = (page: number, pageSize: number) => {
  const queryClient = useQueryClient()
  const mutation = usePostMemberMutation({
    mutation: {
      onSuccess: () => {
        const queryKey = getGetMembersQueryKey({
          page_id: page,
          page_size: pageSize,
        })
        queryClient.invalidateQueries(queryKey)
      },
    },
  })

  const createMember = useCallback(
    (data: Camelized<ApiCreateMemberRequest>) => {
      mutation.mutate({
        data,
      })
    },
    [mutation]
  )

  return { createMember }
}

export const useDeleteMembers = (page: number, pageSize: number) => {
  const queryClient = useQueryClient()
  const mutation = useDeleteMembersMutation({
    mutation: {
      onSuccess: () => {
        const queryKey = getGetMembersQueryKey({
          page_id: page,
          page_size: pageSize,
        })
        queryClient.invalidateQueries(queryKey)
      },
    },
  })

  const deleteMembers = useCallback(
    (ids: string[]) => {
      mutation.mutate({ params: { ids: ids.join(',') } })
    },
    [mutation]
  )

  return { deleteMembers }
}
