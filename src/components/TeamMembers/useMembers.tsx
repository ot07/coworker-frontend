import { useListMembersQuery } from "@/api/members/hooks";
import { ListMembersResponse, Status } from "@/api/members/queryFn";

export interface Member {
  id: string;
  fullName: string;
  email: string;
  status: Status;
  dateAdded: Date;
}

const membersTranslator = (data: ListMembersResponse): Member[] =>
  data.map(({ id, firstName, lastName, email, status, createdAt }) => ({
    id,
    fullName: `${firstName} ${lastName}`,
    email,
    status,
    dateAdded: new Date(createdAt),
  }));

export const useListMembers = () => {
  const { data: members, isLoading } = useListMembersQuery<Member[]>({
    select: membersTranslator,
  });
  return { members, isLoading };
};
