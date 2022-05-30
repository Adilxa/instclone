import { ChevronUpIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

function ScrollToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Simple Scroll to Top Functionality

  const scrollHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // eslint-disable-next-line no-restricted-globals
      if (scrollY > 600) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <div>
      {showTopBtn && (
        <ChevronUpIcon
          onClick={scrollHandler}
          className="h-11 fixed right-10 z-50 lg:right-20 bottom-10 lg:bottom-14 cursor-pointer bg-red-500 text-yellow-300 rounded-lg animate-bounce"
        />
      )}
    </div>
  );
}

export default ScrollToTop;
