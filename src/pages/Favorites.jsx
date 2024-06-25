import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Movie from "../components/Movie";
import axios from "axios";

const Favorites = () => {
    const favoriteMovies = window.localStorage.favoriteMovies.split(",");
    const [moviesData, setMoviesData] = useState([]);

    useEffect(() => {
        if (window.localStorage.favoriteMovies) {
            Promise.all(
                favoriteMovies.map((id) =>
                    axios.get(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=${
                            import.meta.env.VITE_IMBD_API_KEY
                        }&language=fr-FR`
                    )
                )
            ).then((res) => {
                const movies = res.map((res) => res.data);
                setMoviesData(movies);
            });
        }
    }, [favoriteMovies]);

    return (
        <div>
            <Navigation />
            <div className="favorite-movies">
                {moviesData &&
                    moviesData.map((movie, index) => (
                        <Movie
                            key={`${movie.title}-index${index}`}
                            id={movie.id}
                            img={movie.poster_path}
                            title={movie.title}
                            release={movie.release_date}
                            notation={movie.vote_average}
                            synopsis={movie.overview}
                            favorite={true}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Favorites;
