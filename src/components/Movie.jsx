import React from "react";

const Movie = ({ id, img, title, release, notation, synopsis, favorite }) => {
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

    const removeFavorite = (e) => {
        if (window.localStorage.favoriteMovies) {
            let favoriteMovies = window.localStorage.favoriteMovies.split(",");

            favoriteMovies = favoriteMovies.filter((movie) => {
                return movie != id;
            });

            window.localStorage.favoriteMovies = favoriteMovies.join(",");
        }

        e.target.parentElement.style.display = "none";
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
                <li>{notation && notation}</li>
                <li>{release && release}</li>
            </ul>
            <p className="synopsis">{synopsis}</p>
            {favorite ? (
                <button onClick={(e) => removeFavorite(e)}>
                    Retirer des favoris
                </button>
            ) : (
                <button onClick={() => addFavorite()}>
                    Ajouter aux favoris
                </button>
            )}
        </div>
    );
};

export default Movie;
