import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/3as/historico.css";

const AcordoComoServicoHistorico = () => {
  const [previousEntries, setPreviousEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviousEntries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/load/3as-historico"
        );
        setPreviousEntries(response.data);
        setFilteredEntries(response.data);
      } catch (error) {
        console.error("erro ao carregar dados", error);
      }
    };

    fetchPreviousEntries();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredEntries(previousEntries);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = previousEntries.filter(
        (data) =>
          data.cd_pasta.toLowerCase().includes(query) ||
          data.escritorio.toLowerCase().includes(query) ||
          data.carteira.toLowerCase().includes(query)
      );
      setFilteredEntries(filtered);
    }
  }, [searchQuery, previousEntries]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFistEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(
    indexOfFistEntry,
    indexOfLastEntry
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="previous-entries-page">
      <h1>3AS - Acordo Como Serviço</h1>
      <div className="panel">
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Pesquisar por PASTA, ESCRITORIO ou CARTEIRA"
          ></input>
        </div>
        <button className="stop-button">Paralisar Fase 2</button>
      </div>
      <div className="div-table">
        <div className="div-table-row">
          <div className="div-table-header">Pasta</div>
          <div className="div-table-header">Escritório</div>
          <div className="div-table-header">Carteira</div>
          <div className="div-table-header">Valor Alçada</div>
          <div className="div-table-header">Nível Alçada</div>
          <div className="div-table-header">Data Inclusão</div>
          <div className="div-table-header"></div>
        </div>
        {currentEntries.map((data, index) => (
          <div className="div-table-row" key={index}>
            <div className="div-table-cell">{data.code_agreement}</div>
            <div className="div-table-cell">{data.name_attorney}</div>
            <div className="div-table-cell">{data.id_wallet}</div>
            <div className="div-table-cell">{data.vl_alcada}</div>
            <div className="div-table-cell">{data.ds_alcada}</div>
            <div className="div-table-cell">{data.dt_inclusao}</div>
            <div className="div-table-cell">
              <Link to={`/3as-item/${data.cd_pasta}`} state={{ data }}>
                <button className="button">Mais...</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredEntries.length / entriesPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`page-number ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};

export default AcordoComoServicoHistorico;
