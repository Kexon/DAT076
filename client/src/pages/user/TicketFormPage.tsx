import { Button, Label, Spinner, Textarea, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Ticket } from '../../model/Ticket';
import ApiService from '../../services/ApiService';

export default function TicketFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validTitle, setValidTitle] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value.trim().length > 0) setValidTitle(true);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
    if (event.target.value.trim().length > 0) setValidDescription(true);
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim().length <= 0 && description.trim().length <= 0) {
      setValidTitle(false);
      setValidDescription(false);
      return;
    }
    if (title.trim().length <= 0) {
      setValidTitle(false);
      return;
    }
    if (description.trim().length <= 0) {
      setValidDescription(false);
      return;
    }
    setSubmitted(true);
  };

  useEffect(() => {
    if (!submitted) return;
    const createTicket = async () => {
      const data = await ApiService.createTicket({
        title,
        description,
      });
      setTicket(data);
    };
    createTicket();
  }, [submitted]);

  return (
    <div className="flex h-full w-full flex-col justify-center gap-2">
      <h2 className="text-lg font-medium">Ticket form</h2>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Title" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            required
            onChange={handleTitleChange}
            color={validTitle ? 'gray' : 'failure'}
            helperText={validTitle ? '' : 'Title is required'}
            disabled={submitted}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Description" htmlFor="description" />
          </div>
          <Textarea
            className="focus:shadow-outline border-1 h-28 w-full resize-none appearance-none rounded py-2 px-3 font-normal leading-tight text-gray-700 shadow focus:outline-none lg:h-44"
            id="description"
            placeholder="Description"
            onChange={handleDescriptionChange}
            required
            color={validDescription ? 'gray' : 'failure'}
            helperText={validDescription ? '' : 'Description is required'}
            disabled={submitted}
          />{' '}
        </div>
        {!submitted && (
          <Button gradientDuoTone="greenToBlue" type="submit">
            Submit
          </Button>
        )}
        {ticket && <Navigate to={`/ticket/${ticket.id}`} />}
        {submitted && (
          <Button
            gradientDuoTone="greenToBlue"
            disabled={submitted}
            type="submit"
          >
            <Spinner />
            <span className="pl-3">Submitting...</span>
          </Button>
        )}
      </form>
    </div>
  );
}
