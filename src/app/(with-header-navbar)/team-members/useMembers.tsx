"use client";

import {
  getGetMembersQueryKey,
  useGetMembers as useGetMembersQuery,
} from "@/api/endpoints/members/members";
import { useDeleteMembers as useDeleteMembersMutation } from "@/api/endpoints/members/members";
import { ApiMemberResponse } from "@/api/model";
import { AxiosResponse } from "axios";
import { Camelized } from "humps";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

export interface Member {
  id: string;
  fullName: string;
  email: string;
  dateAdded: Date;
}

const transformer = (
  response: AxiosResponse<Camelized<Required<ApiMemberResponse>>[], any>
): Member[] => {
  return response.data.map(({ id, firstName, lastName, email, createdAt }) => {
    return {
      id: id,
      fullName: `${firstName} ${lastName}`,
      email: email,
      dateAdded: new Date(createdAt),
    };
  });
};

export const useGetMembers = () => {
  return useGetMembersQuery<Member[]>(
    { page_id: 1, page_size: 5 },
    { query: { select: transformer } }
  );
};

export const useDeleteMembers = () => {
  const queryClient = useQueryClient();
  const mutation = useDeleteMembersMutation({
    mutation: {
      onSuccess: () => {
        const queryKey = getGetMembersQueryKey({ page_id: 1, page_size: 5 });
        queryClient.invalidateQueries(queryKey);
      },
    },
  });

  const deleteMembers = useCallback(
    (ids: string[]) => {
      mutation.mutate({ params: { ids: ids.join(",") } });
    },
    [mutation]
  );

  return { deleteMembers };
};
