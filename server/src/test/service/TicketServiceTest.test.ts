import makeTicketService from "../../service/TicketService";
import { NewTicket } from "../../model/Ticket";

test("If a ticket is added to the list then it should be in the list", async () => {
  const newTicket: NewTicket = {
    title: "Test title",
    description: "Test description",
    authorId: 1,
  };

  const ticketService = makeTicketService();
  const { id } = await ticketService.addNewTicket(newTicket);
  const tickets = await ticketService.getAllTickets();
  expect(tickets.some((ticket) => ticket.id === id)).toBeTruthy();
});
