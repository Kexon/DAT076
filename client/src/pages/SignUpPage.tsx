import { Label, TextInput, Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { MdEmail, MdPassword } from 'react-icons/md';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validRepeatPassword, setValidRepeatPassword] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    if (event.target.value.trim().length > 0) setValidUsername(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value.trim().length > 0) setValidPassword(true);
  };

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRepeatPassword(event.target.value);
    if (event.target.value.trim().length > 0) setValidPassword(true);
  };

  /*
   * Add a function to handle the form submission here
   * when createUser is implemented in the backend
   */

  const handleSubmit = () => {
    if (
      username.trim().length <= 0 &&
      password.trim().length <= 0 &&
      repeatPassword.trim().length <= 0
    ) {
      setValidUsername(false);
      setValidPassword(false);
      setValidRepeatPassword(false);
      return;
    }
    if (username.trim().length <= 0) {
      setValidUsername(false);
      return;
    }
    if (password.trim().length <= 0) {
      setValidPassword(false);
      return;
    }
    if (repeatPassword.trim().length <= 0) {
      setValidRepeatPassword(false);
      return;
    }
    setSubmitted(true);
  };

  /*
   * This should be moved to a service file!
   */
  useEffect(() => {
    const createUser = async () => {
      if (
        username.trim().length <= 0 ||
        password.trim().length <= 0 ||
        repeatPassword.trim().length <= 0
      )
        return;
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        console.log('User created');
      } else {
        console.log('User not created');
      }
    };
    createUser();
  }, [submitted]);

  return (
    <div className="mx-auto h-max">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold lg:text-5xl">Welcome to tickino!</h1>
        <p className="text-sm font-thin">
          Enter your credentials to create a new account.
        </p>
      </div>
      <div className="flex h-max justify-center">
        <form
          className="flex w-full flex-col gap-4 p-4 lg:w-3/4 xl:w-2/3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="Enter your email"
              rightIcon={MdEmail}
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
              rightIcon={MdPassword}
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
              rightIcon={MdPassword}
              id="repeat-password"
              type="password"
              onChange={handleRepeatPasswordChange}
              required
              shadow
            />
          </div>

          <div className="flex justify-end">
            {!submitted && (
              <Button
                className="w-full lg:w-1/3"
                type="submit"
                disabled={!username || !password || !repeatPassword}
                onClick={handleSubmit}
              >
                Register new account
              </Button>
            )}

            {submitted && (
              <Button
                className="w-full bg-blue-500 lg:w-1/3"
                disabled={submitted}
                type="submit"
              >
                <Spinner />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
