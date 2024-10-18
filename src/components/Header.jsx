import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const searchFunction = () => {
    const holder = inputRef.current.value.trim().split(" ").join("+");
    if (holder) {
      navigate(`/movies/search/${holder}`);
    } else {
      console.log("Please enter a valid search query.");
    }
  };

  return (
    <div className="bg-[#33393f] h-36 md:h-28 flex items-center px-6 flex-col gap-3 md:gap-6 xl:flex-row xl:items-center xl:justify-between xl:px-16">
      <div
        className="logo text-xl mt-2 xl:mt-0 xl:text-3xl"
        onClick={() => navigate("/movies")}
      >
        MovieDB
      </div>
      <div className="controls w-full flex flex-col gap-5 md:flex-row md:justify-between xl:justify-normal xl:w-fit xl:text-lg xl:gap-10">
        <div className="flex justify-between md:gap-10 items-center xl:gap-8">
          <div
            className="popular hover:underline cursor-pointer"
            onClick={() => navigate("/movies")}
          >
            Popular
          </div>
          <div
            className="topRated hover:underline cursor-pointer"
            onClick={() => navigate(`/movies/topRated`)}
          >
            Top Rated
          </div>
          <div
            className="upcoming hover:underline cursor-pointer"
            onClick={() => navigate("/movies/upcoming")}
          >
            Upcoming
          </div>
        </div>

        <div className="search flex justify-center gap-5">
          <input
            ref={inputRef}
            type="text"
            className="rounded-md focus:outline-none text-slate-800 px-2 font-medium xl:px-4"
            placeholder="search movies"
          />
          <button
            className="bg-[#6c747d]/75 px-4 py-1 rounded-md hover:bg-[#6c747d]"
            onClick={searchFunction}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
