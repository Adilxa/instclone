import React from "react";
import { useUserAuth } from "../context/UserAuthContextProvider";
import { storiesData } from "../Assets/StoriesData";

function Stories() {
  const { user } = useUserAuth();
  const userName = user.email?.split("@")[0];

  return (
    <div className="flex overflow-x-scroll mt-1 sm:mt-5 border shadow-sm space-x-3 max-h-max p-3 rounded-sm bg-white scrollbar-thin scrollbar-thumb-black hover:scrollbar-thumb-rose-500">
      <div className="flex flex-col rounded-full">
        <img
          className="w-14 rounded-full object-contain p-[1px] border-2 border-red-500 hover:scale-110 transition duration-75 cursor-pointer"
          src={
            user.photoURL
              ? user.photoURL
              : `https://avatars.dicebear.com/api/adventurer-neutral/:${userName}.svg`
          }
          alt={userName}
        />
        <h2 className="w-14 text-xs font-normal text-center truncate mb-2">
          {userName}
        </h2>
      </div>
      {storiesData.map(
        (story) =>
          story.userAvatar && (
            <div key={story.id} className="flex flex-col rounded-full">
              <img
                className="w-14 h-14 rounded-full object-cover p-[1px] border-2 border-red-500 hover:scale-110 transition duration-75 cursor-pointer"
                src={
                  story.userAvatar
                    ? story.userAvatar
                    : `https://avatars.dicebear.com/api/avataaars/:${story.userName}.svg`
                }
                alt={story.userName}
              />
              <h2 className="w-14 text-xs font-normal text-center truncate mb-2">
                {story.userName}
              </h2>
            </div>
          )
      )}
    </div>
  );
}

export default Stories;
