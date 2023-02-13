import { useState } from 'react';

export default function TicketFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    // eslint-disable-next-line no-console
    console.log(title);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
    // eslint-disable-next-line no-console
    console.log(description);
  };

  return (
    <div className="container mx-auto h-screen border-2">
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
                onChange={() => handleTitleChange}
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
                onChange={() => handleDescriptionChange}
              />
            </label>
          </div>
          <div className="flex w-full justify-end">
            <button
              className="w-32 rounded bg-orange-600 py-2 px-4 text-xl font-bold text-white hover:bg-orange-700"
              type="button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
