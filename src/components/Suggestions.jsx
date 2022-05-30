import React from "react";
import { SuggestionsList } from "../Assets/Suggestions";

function Suggestions() {
  return (
    <div className="p-2">
      <div className="flex items-center justify-between p-2">
        <p className="text-gray-600">suggestions for you</p>
        <p className="font-semibold">See All</p>
      </div>
      <div>
        {SuggestionsList.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-2">
            <img
              className="w-10 h-10 rounded-full p-[2px]"
              src={user?.userAvatar}
              alt={user?.userName}
            />
            <div className="flex-1 ml-3">
              <h2 className="font-bold">{user?.userName}</h2>
              <p className="text-gray-500 text-sm">Works at {user?.worksAt}</p>
            </div>
            <h3 className="text-sm text-blue-400 hover:text-blue-500">
              Follow
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
