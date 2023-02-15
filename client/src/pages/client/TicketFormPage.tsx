import { Button, Label, Textarea, TextInput } from 'flowbite-react';
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

  /*
   * This should be moved to a service file!
   * and the fetch should be replaced with an axios call?
   * I'm not sure if we are going to use axios or fetch
   */
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

  return (
    <div className="mx-auto h-screen">
      <div className="flex h-max justify-center">
        <form
          className=" flex w-full flex-col gap-4 p-4 lg:w-3/4 xl:w-2/3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              className={
                validTitle === false ? 'rounded-lg border-2 border-red-500' : ''
              }
              id="title"
              type="text"
              placeholder="Title"
              onChange={handleTitleChange}
            />
            {!validTitle && (
              <div className="">
                <p className="text-md italic text-red-500">
                  {' '}
                  Title is required{' '}
                </p>
              </div>
            )}
          </div>
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
                <>
                  <span className="font-medium">Alright!</span> Username
                  available!
                </>
              }
              color="failure"
            />{' '}
          </div>
          {!validDescription && (
            <div className="">
              <p className="text-md italic text-red-500">
                {' '}
                Description is required{' '}
              </p>
            </div>
          )}
          <div className="flex w-full justify-end">
            <Button
              className="w-full bg-blue-500 lg:w-1/5"
              disabled={!title || !description || submitted}
              onClick={handleSubmitForm}
              type="submit"
            >
              Submit
              {ticket && <Navigate to={`/ticket/${ticket.id}`} />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
