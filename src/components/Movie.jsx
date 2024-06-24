import React from "react";

const Movie = ({ id, img, title, release, notation, synopsis }) => {
    const addFavorite = () => {
        if (window.localStorage.favoriteMovies) {
            const favoriteMovies =
                window.localStorage.favoriteMovies.split(",");

            for (let i = 0; i < favoriteMovies.length; i++) {
                if (favoriteMovies[i] == id) {
                    return;
                }
            }

            favoriteMovies.push(id);
            window.localStorage.favoriteMovies = favoriteMovies.join(",");
        } else {
            window.localStorage.favoriteMovies = id;
        }
    };

    return (
        <div className="movie-card">
            <div className="img-container">
                <img
                    src={`https://image.tmdb.org/t/p/original${img}`}
                    alt={`poster du film ${title}`}
                    height={"400px"}
                />
            </div>
            <h2>{title}</h2>
            <ul className="infos">
                <li>{notation}</li>
                <li>{release}</li>
            </ul>
            <p className="synopsis">{synopsis}</p>
            <button onClick={() => addFavorite()}>Ajouter aux favoris</button>
        </div>
    );
};

export default Movie;
