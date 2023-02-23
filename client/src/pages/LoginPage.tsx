import { Button, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { MdEmail, MdPassword } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

export default function LoginPage() {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = () => {
    login(username, password);
  };

  useEffect(() => {
    if (user?.id) navigate('/');
  }, [user?.id]);

  return (
    <main>
      <div className="mx-1 flex flex-col gap-2 lg:mx-0">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold lg:text-5xl">
            Welcome to tickino!
          </h1>
          <p className="text-sm font-thin">
            Enter your login credentials below to sign in.
          </p>
        </div>
        <form
          className="m-auto mt-8 flex w-full flex-col gap-4 rounded-lg p-3 shadow-md md:max-w-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Email/Username" />
            </div>
            <TextInput
              id="username3"
              placeholder="johndoe@chalmers.se"
              required
              rightIcon={MdEmail}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="********"
              required
              rightIcon={MdPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            onClick={onSubmit}
            type="submit"
            gradientDuoTone="greenToBlue"
          >
            Submit
          </Button>
        </form>
        <div className="flex justify-center">
          <p className="text-sm font-thin">
            Don&apos;t have an account yet?&nbsp;
          </p>
          <Link className="text-sm font-bold" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
