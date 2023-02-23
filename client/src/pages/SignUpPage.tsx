import { Label, TextInput, Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { MdOutlineAccountCircle, MdPassword } from 'react-icons/md';
import { Navigate } from 'react-router-dom';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [equalPasswords, setEqualPasswords] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validRepeatPassword, setValidRepeatPassword] = useState(true);
  const [errorMessageRepeatPassword, setErrorMessageRepeatPassword] =
    useState('');

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
    if (event.target.value.trim().length > 0) setValidRepeatPassword(true);
  };

  const handleSubmit = () => {
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
      setErrorMessageRepeatPassword('Please repeat your password');
      return;
    }
    if (password !== repeatPassword) {
      setEqualPasswords(false);
      setErrorMessageRepeatPassword('Passwords do not match');
      return;
    }
    setSubmitted(true);
  };

  /*
   * This should be moved to a service file!
   * And it should be an axios call instead of fetch
   */
  useEffect(() => {
    const createUser = async () => {
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
              <Label htmlFor="username" value="Your username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="Enter your username"
              rightIcon={MdOutlineAccountCircle}
              onChange={handleUsernameChange}
              color={validUsername ? 'gray' : 'failure'}
              helperText={validUsername ? '' : 'Username is required'}
              required
              shadow
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              rightIcon={MdPassword}
              id="password"
              type="password"
              color={validPassword ? 'gray' : 'failure'}
              helperText={validPassword ? '' : 'Password is required'}
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
              color={equalPasswords && validRepeatPassword ? 'gray' : 'failure'}
              helperText={
                equalPasswords && validRepeatPassword
                  ? ''
                  : `${errorMessageRepeatPassword}`
              }
              required
              shadow
            />
          </div>

          <div className="flex justify-end">
            {!submitted && (
              <Button
                className="w-full bg-blue-500 lg:w-1/3"
                type="submit"
                onClick={handleSubmit}
              >
                Register new account
              </Button>
            )}
            {/* Change to wait until the user is created? instead of submitted */}
            {submitted && <Navigate to="/" replace />}
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
