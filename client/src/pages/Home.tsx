import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex h-80 max-h-screen flex-col items-center justify-center gap-16">
      <div>
        {/* Hade velat ha en text shadow eller outline men tailwind är väldigt limited i att designa nice text */}
        <h1 className="text-shadow-lg bg-gradient-to-tr from-purple-300 to-purple-700 bg-clip-text text-4xl font-bold text-transparent">
          Welcome to Tickino
        </h1>
      </div>
      <div className="flex flex-row gap-6">
        <Link to="/createticket">
          <Button gradientDuoTone="purpleToBlue" className="h-16 w-32">
            <h1 className="text-center">Create ticket</h1>
          </Button>
        </Link>
        <Link to="/admin">
          <Button outline gradientDuoTone="purpleToBlue" className="h-16 w-32">
            <h1 className="text-center">View all tickets</h1>
          </Button>
        </Link>
      </div>
    </div>
  );
}
