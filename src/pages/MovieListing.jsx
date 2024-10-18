import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieThumbnail from "../components/MovieThumbnail";
import { useNavigate } from "react-router-dom";

function MovieListing() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${pageNo}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [pageNo]);

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const paged = (index) => {
    setPageNo(index);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-8 px-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-x-8 md:gap-y-8">
        {movies?.map((movie) => (
          <MovieThumbnail
            onClick={() => handleMovieClick(movie.id)}
            key={movie.id}
            thumbnailImg={movie.poster_path}
            title={movie.original_title}
            rating={movie.vote_average}
          />
        ))}
      </div>
      <div className="pagination flex gap-5 justify-center my-10 xl:my-16">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="num border-2 border-cyan-600 py-1 px-3 xl:text-lg xl:py-2 xl:px-5 cursor-pointer"
            onClick={() => paged(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieListing;
