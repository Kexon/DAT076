import { UserInfo } from "./User";
export interface Ticket {
  id: string;
  title: string;
  open: boolean;
  owner: UserInfo;
  assigneeId?: string;
}

export interface NewTicket {
  title: string;
  owner: string;
  description: string;
}
