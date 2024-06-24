import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
import Movie from "../components/Movie";

const Home = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [sortState, setSortState] = useState("top");

    useEffect(() => {
        if (searchData === "") {
            axios
                .get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${
                        import.meta.env.VITE_IMBD_API_KEY
                    }&language=fr-FR&page=1&include_adult=false`
                )
                .then((res) => setMoviesData(res.data.results));
        } else {
            axios
                .get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${
                        import.meta.env.VITE_IMBD_API_KEY
                    }&query=${searchData}&language=fr-FR&include_adult=false`
                )
                .then(
                    (res) => res.data.results && setMoviesData(res.data.results)
                );
        }
    }, [searchData]);

    const handleChange = (e) => {
        setSearchData(e.target.value);
    };

    return (
        <div>
            <Navigation />
            <div className="form-container">
                <form>
                    <input
                        type="text"
                        placeholder="Rechercher un film"
                        onChange={(e) => handleChange(e)}
                    />
                </form>
                <button onClick={() => setSortState("top")}>Top</button>
                <button onClick={() => setSortState("flop")}>Flop</button>
            </div>

            <div className="movies">
                {moviesData &&
                    moviesData
                        .sort((a, b) =>
                            sortState === "top"
                                ? b.vote_average - a.vote_average
                                : a.vote_average - b.vote_average
                        )
                        .map((movie, index) => (
                            <Movie
                                key={movie.title + "-index" + index}
                                id={movie.id}
                                img={movie.poster_path}
                                title={movie.title}
                                release={movie.release_date}
                                notation={movie.vote_average}
                                synopsis={movie.overview}
                            />
                        ))}
            </div>
        </div>
    );
};

export default Home;
