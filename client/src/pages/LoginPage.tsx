import { Button, Label, TextInput } from 'flowbite-react';
import { MdEmail, MdPassword } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function LoginPage() {
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
        <form className="m-auto mt-8 flex w-full flex-col gap-4 rounded-lg p-3 shadow-md md:max-w-lg">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Email/Username" />
            </div>
            <TextInput
              id="username3"
              placeholder="johndoe@chalmers.se"
              required
              rightIcon={MdEmail}
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
            />
          </div>
          <Button type="submit" gradientDuoTone="greenToBlue">
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
