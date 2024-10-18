import { useState } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import MovieListing from "./pages/movieListing";
import Footer from "./components/Footer";
import MovieDetail from "./pages/MovieDetails";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export const AppRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/movies/:moviesId",
        element: <MovieDetail />,
      },
      {
        path: "/",
        element: <MovieListing />,
      },
      {
        path: "/movies/topRated",
        element: <TopRated />,
      },
      {
        path: "/movies/upcoming",
        element: <Upcoming />,
      },
      {
        path: "/movies/search/:searchText",
        element: <SearchResults />,
      },
    ],
  },
]);
export default App;
