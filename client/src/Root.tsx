import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { AuthProvider } from './hooks/AuthProvider';

export default function Root() {
  return (
    <AuthProvider>
      <>
        <NavBar />
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </>
    </AuthProvider>
  );
}
