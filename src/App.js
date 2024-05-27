import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getMovieList, searchMovie } from "./api";
import "./App.css";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt={movie.title}  
          />
          <div className="Movie-date"> Release: {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if(q.length > 3) { 
    const query = await searchMovie(q)
    setPopularMovies(query.results)
    }
  };

  console.log({ popularMovies: popularMovies });

  return (
    <div className="App">
      <Helmet>
        <title> BIOSKOP FILM FAREL</title>
      </Helmet>
      <header className="App-header">
        <h1> BIOSKOP FILM FAREL</h1>
        <input
          placeholder="Cari Film yang Ingin Ditonton..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMoviesList />
        </div>
      </header>
    </div>
  );
};

export default App;
