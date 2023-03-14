import { Label, TextInput, Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';

/**
 * This page is used to change the user's password.
 * @returns A component that displays the user settings page.
 */
export default function UserSettingsPage() {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [correctPassword, setCorrectPassword] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePassword1Change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword1(event.target.value);
    /*
    if (event.target.value.trim().length > 0) setValidTitle(true);
    */
  };

  const handlePassword2Change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword2(event.target.value);
    /*
    if (event.target.value.trim().length > 0) setValidTitle(true);
    */
  };

  const handlePassword3Change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentPassword(event.target.value);
    /*
    if (event.target.value.trim().length > 0) setValidTitle(true);
    */
  };

  const handleSubmit = () => {
    setNewPasswordValid(true);
    setCorrectPassword(true);
    setSuccess(false);

    if (password1.trim().length <= 0 || password2.trim().length <= 0) {
      setNewPasswordValid(false);
      setNewPasswordError('Please fill out both fields');
      return;
    }

    if (password1 !== password2) {
      setNewPasswordValid(false);
      setNewPasswordError('Passwords do not match');
      return;
    }
    /*  if (currentPassword !== 'test') {
      setCorrectPassword(false);
      return;
    } */
    setSubmitted(true);
  };

  const clearAllForms = () => {
    setPassword1('');
    setPassword2('');
    setCurrentPassword('');
  };
  useEffect(() => {
    if (!submitted) return;
    const changePassword = async () => {
      try {
        await UserService.changePassword(currentPassword, password1);
        setSuccess(true);
        setSubmitted(false);
        clearAllForms();
      } catch (error) {
        setCorrectPassword(false);
        setSubmitted(false);
      }
    };
    changePassword();
  }, [submitted]);

  return (
    <div className="flex h-full w-full flex-col justify-start gap-8">
      <h2 className="text-center text-lg font-medium">Account settings</h2>
      <form
        /* This onSubmit line is required, in order to prevent the page from reloading when the form is submitted. */
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="password3" value="Current password *" />
            <TextInput
              id="password3"
              type="password"
              onChange={handlePassword3Change}
              value={currentPassword}
              required
              helperText={
                !correctPassword && (
                  <p className="text-red-500">Password is wrong!</p>
                )
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password1" value="New password *" />
            <TextInput
              id="password1"
              type="password"
              onChange={handlePassword1Change}
              value={password1}
              required
              helperText={
                !newPasswordValid && (
                  <p className="text-red-500">{newPasswordError}</p>
                )
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password2" value="Repeat password *" />
            <TextInput
              id="password2"
              type="password"
              onChange={handlePassword2Change}
              value={password2}
              required
              helperText={
                !newPasswordValid && (
                  <p className="text-red-500">{newPasswordError}</p>
                )
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="ml-1 text-sm font-medium text-green-500">
              {success ? 'Password successfully changed!' : ''}
            </p>
            <Button
              type="submit"
              className="w-32"
              onClick={handleSubmit}
              disabled={submitted}
            >
              {!submitted ? (
                'Submit'
              ) : (
                <div className="flex gap-2">
                  <Spinner /> Submitted
                </div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
