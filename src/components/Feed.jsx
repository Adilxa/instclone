import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed() {
  return (
    <main className="mt-[70px] grid grid-cols-1 gap-7 md:grid-cols-2 md:max-w-2xl xl:grid-cols-3 xl:max-w-5xl mx-auto">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      <section className="hidden xl:inline-block xl:col-span-1 mt-1 sm:mt-5">
        <div className="fixed">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
}

export default Feed;
