import { Button, Label, Textarea, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function TicketFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Description" />
            </div>
            <Textarea
              className="focus:shadow-outline w-full resize-none appearance-none rounded border py-2 px-3 font-normal leading-tight text-gray-700 shadow focus:outline-none"
              id="description"
              placeholder="Description"
              rows={5}
              onChange={handleDescriptionChange}
            />{' '}
          </div>
          <div className="flex w-full justify-end">
            <Button
              className="w-full bg-blue-500 lg:w-1/5"
              type="submit"
              onClick={handleSubmitForm}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
