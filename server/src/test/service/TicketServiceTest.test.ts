import makeTicketService from "../../service/ticket/TicketService";
import { NewTicket } from "../../model/Ticket";

test("If a ticket is added to the list then it should be in the list", async () => {
  const newTicket: NewTicket = {
    title: "Test title",
    description: "Test description",
    authorId: "1",
  };

  const ticketService = makeTicketService();
  const { id: id } = await ticketService.addNewTicket(newTicket);
  const tickets = await ticketService.getAllTickets();
  expect(tickets.some((ticket) => ticket.id === id)).toBeTruthy();
});

test("Test if ticket can be acquired by id", async () => {
  const newTicket: NewTicket = {
    title: "Test title",
    description: "Test description",
    authorId: "1",
  };

  const ticketService = makeTicketService();
  const { id: id } = await ticketService.addNewTicket(newTicket);
  const ticket = await ticketService.getTicketById(id);
  expect(ticket[0].id === id).toBeTruthy();
});
