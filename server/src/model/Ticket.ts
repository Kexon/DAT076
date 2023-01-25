export default interface Ticket {
  id: number;
  title: string;
  description: string;
  open: boolean;
  authorid: number;
  assigneeid?: number;
}
