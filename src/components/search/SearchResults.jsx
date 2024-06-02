import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/searchresults.css";
import SearchBox from "./SearchBox";

const SearchResults = () => {
  const location = useLocation();
  const { data } = location.state || {};

  if (!data) {
    return <div>Pasta não encontrada.</div>;
  }

  return (
    <div className="search-results">
      <SearchBox />
      <h1>Resultados da Pesquisa</h1>
      <div className="section-container">
        <h3>3AS - Acordo Como Serviço</h3>
        <div className="section-content">
          <div className="section-label">Pasta: </div>
          <div className="section-value">{data.cd_pasta}</div>
          <div className="section-label">Carteira: </div>
          <div className="section-value">{data.carteira}</div>
          <div className="section-label">Escritório: </div>
          <div className="section-value">{data.escritorio}</div>
        </div>
        <Link to={`/3as-item/${data.cd_pasta}`} state={{ data }}>
          <button className="more-button">Mostrar o resto</button>
        </Link>
      </div>

      <div className="section-container">
        <h3>Campanhas</h3>
        <div className="section-content">
          <div className="section-label">Pasta: </div>
          <div className="section-value">{data.cd_pasta}</div>
          <div className="section-label">Carteira: </div>
          <div className="section-value">{data.carteira}</div>
          <div className="section-label">Escritório: </div>
          <div className="section-value">{data.escritorio}</div>
        </div>
        <Link to={`/campanhas-item/${data.cd_pasta}`} state={{ data }}>
          <button className="more-button">Mostrar o resto</button>
        </Link>
      </div>

      <div className="section-container">
        <h3>Majoração</h3>
        <div className="section-content">
          <div className="section-label">Pasta: </div>
          <div className="section-value">{data.cd_pasta}</div>
          <div className="section-label">Carteira: </div>
          <div className="section-value">{data.carteira}</div>
          <div className="section-label">Valor Alçada Máxima </div>
          <div className="section-value">{data.vl_alcada_max}</div>
        </div>
        <Link to={`/majoracao-item/${data.cd_pasta}`} state={{ data }}>
          <button className="more-button">Mostrar o resto</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchResults;
