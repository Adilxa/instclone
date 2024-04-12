import React from "react";
import InstaLogo from "../Assets/Images/insta-logo.png";
import InstaMobileLogo from "../Assets/Images/insta-mobile-logo.png";
import {
  HeartIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useUserAuth } from "../context/UserAuthContextProvider";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logOut, setModelOpen } = useUserAuth();
  const userName = user.email?.split("@")[0];

  return (
    <header className="w-full bg-white shadow-md flex items-center fixed top-0 z-50">
      <nav className="container mx-auto py-2 px-5 2xl:px-16 flex justify-between items-center">
        {/* Instagram Logo */}
        <div>
          <Link to="/home">
            <img
              className="hidden md:block"
              src={InstaLogo}
              alt="Instagram Logo"
            />
            <img
              className="block md:hidden w-8"
              src={InstaMobileLogo}
              alt="Instagram Logo"
            />
          </Link>
        </div>
        {/* Search Bar */}
        <div className="w-[50%] sm:w-[30%] flex items-center border border-gray-400 rounded-md">
          <SearchIcon className="w-6 m-1 text-gray-400 mx-1" />
          <input
            className="focus:outline-none border-none focus:text-gray-500 focus:ring-0 focus:border-red-600 px-3 py-1 w-full rounded-md"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            autoComplete="off"
          />
        </div>
        {/* Icons */}
        <div className="flex items-center space-x-4">
          <HomeIcon className="hidden sm:inline-flex w-7 text-black hover:scale-110 transition duration-75" />
          <div className="hidden sm:inline-flex relative w-7 text-black hover:scale-110 transition duration-75">
            <PaperAirplaneIcon className="hidden sm:inline-flex w-7 text-black hover:scale-110 transition duration-75" />
            <div className="absolute -top-2 -right-3 bg-red-500 rounded-full text-xs w-5 h-5 flex items-center justify-center text text-white">
              3
            </div>
          </div>
          {/* This triggers the Model to be Open */}
          <PlusCircleIcon
            onClick={() => setModelOpen(true)}
            className="inline-flex w-7 text-black cursor-pointer hover:scale-110 transition duration-75"
          />
          <UserGroupIcon className="hidden sm:inline-flex w-7 text-black hover:scale-110 transition duration-75" />
          <HeartIcon className="hidden sm:inline-flex w-7 text-black hover:scale-110 transition duration-75" />
          <div className="border-2 border-green-500 rounded-full">
            <img
              onClick={logOut}
              className="w-11 rounded-full p-[1px] cursor-pointer"
              src={
                user?.photoURL
                  ? user.photoURL
                  : `https://api.dicebear.com/8.x/pixel-art/svg?seed=${userName}.svg`
              }
              alt={user?.displayName}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
