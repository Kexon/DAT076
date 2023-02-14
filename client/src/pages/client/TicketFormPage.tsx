import { Button, Label, Textarea, TextInput, Toast } from 'flowbite-react';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';

export default function TicketFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validTitle, setValidTitle] = useState(true);
  const [validDescription, setValidDescription] = useState(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
  };

  /*
   * This should be moved to a service file!
   * and the fetch should be replaced with an axios call?
   * I'm not sure if we are going to use axios or fetch
   */
  const handleSubmitForm = () => {
    if (title.trim().length <= 0) {
      setValidTitle(false);
      return;
    }
    if (description.trim().length <= 0) {
      setValidDescription(false);
      return;
    }

    fetch('http://localhost:8080/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
      });
  };

  return (
    <div className="mx-auto h-screen">
      <div className="flex h-max justify-center">
        <form className=" flex w-full flex-col gap-4 p-4 lg:w-3/4 xl:w-2/3">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
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
              <Label value="Description" />
            </div>
            <Textarea
              className="focus:shadow-outline h-28 w-full resize-none appearance-none rounded border py-2 px-3 font-normal leading-tight text-gray-700 shadow focus:outline-none lg:h-64"
              id="description"
              placeholder="Description"
              onChange={handleDescriptionChange}
            />{' '}
          </div>
          {!validDescription && (
            <div className="">
              <p className="text-md italic text-red-500"> Title is required </p>
            </div>
          )}
          <div className="flex w-full justify-end">
            <Button
              className="w-full bg-blue-500 lg:w-1/5"
              disabled={!title || !description}
              onClick={handleSubmitForm}
              type="submit"
            >
              Submit
            </Button>
          </div>
          {errorMessage && (
            <div className="flex w-full justify-center">
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <HiX className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{errorMessage} </div>
                <Toast.Toggle />
              </Toast>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
