import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"; // Import the CSS file for styling
import SearchBox from "./components/search/SearchBox";

const ButtonsPage = () => {
  return (
    <div className="buttons-page">
      <SearchBox />
      <div className="buttons-container">
        <Link to="/load/3as-historico">
          <button className="custom-button">3AS - Acordo Como Serviço</button>
        </Link>
        <Link to="/load/majoracao-historico">
          <button className="custom-button">Majoração Automática</button>
        </Link>
        <Link to="/campanhas">
          <button className="custom-button">Campanhas</button>
        </Link>
      </div>
    </div>
  );
};

export default ButtonsPage;
