import { Label, TextInput, Button } from 'flowbite-react';
import { useState } from 'react';
import { HiMail, HiKey } from 'react-icons/hi';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    if (event.target.value.trim().length > 0) setValidUsername(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value.trim().length > 0) setValidPassword(true);
  };

  /*
   * Add a function to handle the form submission here
   * when createUser is implemented in the backend
   */

  return (
    <div className="mx-auto h-max">
      <div className="flex h-max justify-center">
        <form className="flex w-full flex-col gap-4 p-4 lg:w-3/4 xl:w-2/3">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="Enter your email"
              rightIcon={HiMail}
              onChange={handleUsernameChange}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput
              rightIcon={HiKey}
              id="password2"
              type="password"
              onChange={handlePasswordChange}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput
              rightIcon={HiKey}
              id="repeat-password"
              type="password"
              required
              shadow
            />
          </div>
          <div className="flex justify-end">
            <Button className="w-full lg:w-1/3" type="submit">
              Register new account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
