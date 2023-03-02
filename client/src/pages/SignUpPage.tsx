import { Label, TextInput, Button, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { MdOutlineAccountCircle, MdPassword } from 'react-icons/md';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

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
  const { user, register } = useAuth();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    register(username, password);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto h-max">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold lg:text-5xl">Welcome to tickino!</h1>
        <p className="text-sm font-thin">
          Choose your credentials to create a new account.
        </p>
      </div>

      <div className="flex h-max justify-center">
        <form
          className="flex w-full flex-col gap-4 rounded-lg p-4 shadow-md md:max-w-lg"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="Username"
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
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              rightIcon={MdPassword}
              id="password"
              type="password"
              placeholder="********"
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
              placeholder="********"
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

          {!submitted && (
            <Button type="submit" gradientDuoTone="greenToBlue">
              Register new account
            </Button>
          )}
          {user && <Navigate to="/" replace />}
          {submitted && (
            <Button
              gradientDuoTone="greenToBlue"
              disabled={submitted}
              type="submit"
            >
              <Spinner />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
