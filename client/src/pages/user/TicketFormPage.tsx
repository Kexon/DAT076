import { Button, Label, Spinner, Textarea, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket } from '../../model/Ticket';
import ApiService from '../../services/ApiService';

export default function TicketFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validTitle, setValidTitle] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmitForm = () => {
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
    const createTicket = async () => {
      if (title.trim().length <= 0 || description.trim().length <= 0) return;

      const data = await ApiService.createTicket({
        title,
        description,
        authorId: 1,
      });
      setTicket(data);
    };
    createTicket();
  }, [submitted]);

  useEffect(() => {
    if (ticket) navigate(`/ticket/${ticket.id}`);
  }, [ticket?.id]);

  return (
    <div className="mx-auto h-max">
      <div className="flex h-max justify-center">
        <form
          className=" flex w-full flex-col gap-4 p-4 lg:w-3/4 xl:w-2/3"
          onSubmit={(e) => e.preventDefault()}
        >
          {validTitle && (
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
                color="gray"
                disabled={submitted}
              />
            </div>
          )}

          {!validTitle && (
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
                helperText={
                  <span className="font-medium">Title is required!</span>
                }
                color="failure"
              />
            </div>
          )}

          {validDescription && (
            <div>
              <div className="mb-2 block">
                <Label value="Description" htmlFor="description" />
              </div>
              <Textarea
                className="focus:shadow-outline border-1 h-28 w-full resize-none appearance-none rounded py-2 px-3 font-normal leading-tight text-gray-700 shadow focus:outline-none lg:h-64"
                id="description"
                placeholder="Description"
                onChange={handleDescriptionChange}
                required
                color="gray"
                disabled={submitted}
              />{' '}
            </div>
          )}

          {!validDescription && (
            <div>
              <div className="mb-2 block">
                <Label value="Description" htmlFor="description" />
              </div>
              <Textarea
                className="focus:shadow-outline border-1 h-28 w-full resize-none appearance-none rounded py-2 px-3 font-normal leading-tight text-gray-700 shadow focus:outline-none lg:h-64"
                id="description"
                placeholder="Description"
                onChange={handleDescriptionChange}
                required
                helperText={
                  <span className="font-medium">Description is required!</span>
                }
                color="failure"
              />{' '}
            </div>
          )}

          <div className="flex w-full justify-end">
            {!submitted && (
              <Button
                className="w-full bg-blue-500 lg:w-1/4"
                disabled={!title || !description} // Possibly change this to only check if the form is submitted
                onClick={handleSubmitForm}
                type="submit"
              >
                Submit
              </Button>
            )}
            {submitted && (
              <Button
                className="w-full bg-blue-500 lg:w-1/4"
                disabled={submitted} // Possibly change this to only check if the form is submitted
                type="submit"
              >
                <Spinner />
                <span className="pl-3">Submitting...</span>
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
