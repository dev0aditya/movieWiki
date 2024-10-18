import React from "react";

function MovieThumbnail({ thumbnailImg, title, rating, onClick }) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <img
        src={"https://image.tmdb.org/t/p/w500" + thumbnailImg}
        className="rounded-md"
      />
      <div className="title mt-2 font-medium tracking-wide text-center xl:text-xl 2xl:text-2xl xl:mt-3">
        {title}
      </div>
      <div className="rating opacity-60 xl:text-lg xl:mt-1">
        rating: {rating.toFixed(1)}
      </div>
    </div>
  );
}

export default MovieThumbnail;
