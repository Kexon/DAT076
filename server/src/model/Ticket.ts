export default interface Ticket {
    id: number;
    title: string;
    description: string;
    status: string;
    authorid: number;
    assigneeid: number;
}