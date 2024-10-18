import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

function MovieDetail() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
  const [castData, setCastData] = useState(null);

  function textLimiter(text, limit = 150) {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6.8,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 3.9 } },
      { breakpoint: 480, settings: { slidesToShow: 2.6 } },
      { breakpoint: 1024, settings: { slidesToShow: 5.6 } },
    ],
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${moviesId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${moviesId}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );

        setMovie(movieResponse.data);
        setCastData(castResponse.data.cast);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
  }, [moviesId]);

  if (!movie || !castData) return <p>Loading...</p>;

  return (
    <div className=" mt-8">
      <div className="bannerBox relative">
        <div className="boxy h-full">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-[40rem] object-cover brightness-50"
          />
          <div className="absolute top-0 left-0 p-4 md:px-16 md:py-10">
            <div className="bannerDetails text-center md:text-start">
              <div className="boxOne flex flex-col items-center md:flex-row md:gap-10 md:items-start lg:gap-16">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-1/2 mb-4 md:w-1/3 lg:w-1/4 xl:w-1/6"
                />
                <div className="textDetails md:mt-6">
                  <h1 className="text-3xl font-bold xl:text-5xl">
                    {movie.title}
                  </h1>
                  <h3 className="text-xl my-2 xl:text-2xl xl:my-4">
                    Rating: {movie.vote_average.toFixed(1)}
                  </h3>
                  <p className="text-md mt-3 xl:mt-6 xl:text-lg">
                    <span className="mr-5 border-[1px] border-gray-500 p-1 rounded-md xl:text-base">
                      {movie.runtime} min
                    </span>{" "}
                    {movie.genres.map((genre, index) => (
                      <span key={genre.id}>
                        {genre.name}
                        {index < movie.genres.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p className="mt-1 md:mt-3 xl:mt-4 xl:text-lg">
                    Release Date : {movie.release_date}
                  </p>
                </div>
              </div>
              <div className="boxTwo mt-6">
                <h2 className="text-2xl font-semibold mb-2 xl:text-3xl">
                  Overview
                </h2>
                <p className="text-justify xl:text-lg">
                  {textLimiter(movie.overview)}{" "}
                  <a
                    target="blank"
                    href={movie.homepage}
                    className="text-xs text-blue-500 cursor-pointer"
                  >
                    (read more)
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cast mt-8 px-4 md:px-6 xl:px-16 xl:mt-16">
          <h3 className="text-2xl font-semibold mb-4 xl:text-4xl xl:mb-10">
            Cast
          </h3>
          <Slider {...settings} className="">
            {castData.map((cast) => (
              <div
                key={cast.id}
                className="text-center pr-5 xl:pr-8 focus:outline-none"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                  alt={cast.name}
                  className="object-cover rounded-lg mb-2 w-full"
                />
                <p className="text-lg font-medium xl:text-xl">{cast.name}</p>
                <p className="text-sm text-gray-500 xl:text-base">
                  {cast.character}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
