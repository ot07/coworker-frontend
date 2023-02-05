import { useListMembersQuery } from "@/api/members/hooks";
import { ListMembersResponse, Status } from "@/api/members/queryFn";

export interface Member {
  id: string;
  fullName: string;
  email: string;
  status: Status;
}

const membersTranslator = (data: ListMembersResponse): Member[] =>
  data.map(({ id, firstName, lastName, email, status }) => ({
    id,
    fullName: `${firstName} ${lastName}`,
    email,
    status,
  }));

export const useListMembers = () => {
  const { data: members, isLoading } = useListMembersQuery<Member[]>({
    select: membersTranslator,
  });
  return { members, isLoading };
};
