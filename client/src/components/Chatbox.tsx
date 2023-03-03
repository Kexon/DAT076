import { Button, Label } from 'flowbite-react';
import React from 'react';

interface Props {
  onSubmit: (content: string) => Promise<void>;
  onTicketClick: () => void;
  canEditTicket: boolean;
  ticketStatus: boolean;
}

export default function Chatbox({
  onSubmit,
  onTicketClick,
  canEditTicket,
  ticketStatus,
}: Props) {
  const [content, setContent] = React.useState('');

  const handleOnSubmit = async () => {
    await onSubmit(content);
    setContent('');
  };

  return (
    <div>
      <form /* This onSubmit line is required, in order to prevent the page from reloading when the form is submitted. */
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
          <div className="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
            <Label htmlFor="comment">Your comment</Label>
            <textarea
              id="comment"
              rows={5}
              className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
            <div className="flex gap-2">
              <Button type="submit" onClick={handleOnSubmit}>
                Post comment
              </Button>
              <Button
                className={!canEditTicket ? 'hidden' : ''}
                color={ticketStatus ? 'failure' : 'success'}
                onClick={onTicketClick}
              >
                {ticketStatus ? 'Close ticket' : 'Open ticket'}
              </Button>
            </div>
            <div className="flex space-x-1 pl-0 sm:pl-2">
              <button
                type="button"
                className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Set location</span>
              </button>
              <button
                type="button"
                className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
