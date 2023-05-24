import { signIn, signOut, useSession } from "next-auth/react";
import {
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
  WithUser,
} from "@clerk/nextjs";
import React, { useState } from "react";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const user = useUser();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <a href="https://www.bluekey.ai/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Bluekey
          </span>
        </a>
        <div className="flex md:order-2">
          {user.isSignedIn ? (
            <>
              <WithUser>
                {(user) => (
                  <p className="text-white text-xs ">
                    {user.firstName
                      ? `Hello, ${user.firstName}!`
                      : "Hello there!"}
                  </p>
                )}
              </WithUser>

              <SignOutButton>
                <span className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Logout
                </span>
              </SignOutButton>
            </>
          ) : (
            <SignInButton>
              <span className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </span>
            </SignInButton>
          )}
          <NotificationBell />
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                BlueyKey Notification Concept
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
