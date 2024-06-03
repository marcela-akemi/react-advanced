// About.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="buttons-container">
      <Link to="/3as">
        <button className="custom-button">3AS - Aecordo Como Serviço</button>
      </Link>

      <button className="custom-button">Majoração</button>

      <button className="custom-button">Page 2</button>
    </div>
  );
};

export default Home;
