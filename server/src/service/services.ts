import makeMessageDBService from "./message/MessageDBService";
import makeTicketDBService from "./ticket/TicketDBService";
import makeUserDBService from "./user/UserDBService";

export const messageService = makeMessageDBService();
export const ticketService = makeTicketDBService();
export const userService = makeUserDBService();
