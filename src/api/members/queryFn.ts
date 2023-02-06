import axios from "axios";
import * as process from "process";

export type Status = "active" | "offline";

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: Status;
  createdAt: string;
}

export type ListMembersResponse = Member[];

/**
 * GET /members
 */
export const fetchMembers = async () => {
  const { data } = await axios.get<ListMembersResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/members?page_id=1&page_size=5`
  );
  return data;
};
