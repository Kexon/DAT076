import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

export default function Root() {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-4xl">
        <Outlet />
      </div>
    </>
  );
}
