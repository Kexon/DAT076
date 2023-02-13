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
        <form className="bg bg-color=5 bg-blue flex w-full flex-col items-center gap-2 bg-slate-200 p-5 lg:w-3/4 xl:w-2/3">
          <div>
            <p className="text-3xl font-bold text-gray-800">Create ticket</p>
          </div>
          <div className="w-full border-2">
            <label
              className="mb-2 block text-xl font-bold text-gray-700"
              htmlFor="title"
            >
              Title:
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 font-normal leading-tight text-gray-700 shadow focus:outline-none"
                id="title"
                type="text"
                placeholder="Title"
                onChange={handleTitleChange}
              />
            </label>
          </div>
          <div className="w-full border-2">
            <label
              className="mb-2 block text-xl font-bold text-gray-700"
              htmlFor="description"
            >
              Description:
              <textarea
                className="focus:shadow-outline w-full resize-none appearance-none rounded border py-2 px-3 font-normal leading-tight text-gray-700 shadow focus:outline-none"
                id="description"
                placeholder="Description"
                rows={5}
                onChange={handleDescriptionChange}
              />
            </label>
          </div>
          <div className="flex w-full justify-end">
            <button
              className="w-32 rounded bg-orange-600 py-2 px-4 text-xl font-bold text-white hover:bg-orange-700"
              type="button"
              onClick={handleSubmitForm}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
