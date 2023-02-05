import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchMembers, ListMembersResponse } from "@/api/members/queryFn";
import { membersKeys } from "@/api/members/querykey";

export const useListMembersQuery = <TData = ListMembersResponse>(
  options?: Omit<
    UseQueryOptions<
      ListMembersResponse,
      AxiosError,
      TData,
      typeof membersKeys.list
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(membersKeys.list, fetchMembers, { ...options });
};
