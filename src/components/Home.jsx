import React from "react";
import Feed from "./Feed";
import Navbar from "./Navbar";
import Model from "./Model";
import ScrollToTop from "./ScrollToTop";

function Home() {
  return (
    <div className="w-full min-h-[90vh] bg-gray-100">
      <Navbar />
      <Feed />
      <Model />
      <ScrollToTop />
    </div>
  );
}

export default Home;
