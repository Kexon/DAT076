import { NewTicket } from "../../model/Ticket";
import { ticketService } from "../../service/services";

// This test fails because it needs an ownerId
// and the owner should exist as it refers to it in the databaseS
test("If a ticket is added to the list then it should be in the list", async () => {
  const newTicket: NewTicket = {
    title: "Test title",
    description: "Test description",
    owner: "63fe09e0becb05ba0b48b1fd",
  };

  const { id: id } = await ticketService.addNewTicket(newTicket);
  const tickets = await ticketService.getAllTickets();
  expect(tickets.some((ticket) => ticket.id === id)).toBeTruthy();
});

/* test("Test if ticket can be acquired by id", async () => {
  const newTicket: NewTicket = {
    title: "Test title",
    description: "Test description",
    owner: "userid",
  };

  const ticketService = makeTicketService();
  const { id: id } = await ticketService.addNewTicket(newTicket);
  const ticket = await ticketService.getTicketById(id);
  expect(ticket[0].id === id).toBeTruthy();
}); */
