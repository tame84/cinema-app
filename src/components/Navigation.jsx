import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Accueil</NavLink>
                </li>
                <li>
                    <NavLink to="/favoris">Favoris</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
