import { useGetMembers as useGetMembersQuery } from "@/api/endpoints/members/members";
import { ApiMemberResponse } from "@/api/model";
import { AxiosResponse } from "axios";
import { Camelized } from "humps";

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
  const { data: members } = useGetMembersQuery<Member[]>(
    { page_id: 1, page_size: 5 },
    { query: { select: transformer } }
  );

  return { members };
};
