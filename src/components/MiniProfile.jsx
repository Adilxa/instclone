import React from "react";
import { useUserAuth } from "../context/UserAuthContextProvider";

function MiniProfile() {
  const { user, logOut } = useUserAuth();
  const userName = user.email?.split("@")[0];
  return (
    <div className="p-2 flex items-center justify-between">
      <img
        className="w-14 h-14 rounded-full object-contain p-[1px] border border-gray-500"
        src={
          user.photoURL
            ? user.photoURL
            : `https://avatars.dicebear.com/api/adventurer-neutral/:${userName}.svg`
        }
        alt={userName}
      />
      <div className="flex-1 ml-3">
        <h2 className="font-bold mb-1">{userName}</h2>
        <h3 className="text-gray-400 text-sm">Welcome to Instagram</h3>
      </div>
      <button
        onClick={logOut}
        className="text-sm text-blue-400 hover:text-blue-500"
      >
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
