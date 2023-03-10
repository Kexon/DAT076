import { UserInfo } from "./User";
export interface Message {
  id: string;
  chatId: string;
  timestamp: Date;
  sender: UserInfo;
  content: string;
  systemMessage: boolean; // This is used to indicate if the message is a system message, such as a ticket being closed
}

/**
 * NewMessage is a class that represents a new message that is sent to the server.
 * It is used to create a new message in the database, and does not contain the
 * id or the timestamp as these are generated on creation.
 */
export interface NewMessage {
  chatId: string;
  sender: string;
  content: string;
  systemMessage: boolean;
}
