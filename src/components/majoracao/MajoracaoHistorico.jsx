import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/majoracao/majoracaohistorico.css";

const MajoracaoHistorico = () => {
  const [previousEntries, setPreviousEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchPreviousEntries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/load/majoracao-historico"
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
      const filtered = previousEntries.filter((data) =>
        data.cd_pasta.toLowerCase().includes(query)
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
      <h1>Histórico</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Pesquisar por PASTA"
        ></input>
      </div>
      <div className="previous-entries-container">
        <div className="entry-container header-row">
          <div className="section-label">Pasta</div>
          <div className="section-label">Valor Alçada</div>
          <div className="section-label">Nível Alçada</div>
          <div className="section-label">Data Majoração</div>
          <div></div>
        </div>
        {currentEntries.map((data, index) => (
          <div className="entry-container" key={index}>
            <div className="section-value">{data.cd_pasta}</div>
            <div className="section-value">{data.vl_alcada}</div>
            <div className="section-valie">{data.ds_alcada}</div>
            <div className="section-value">{data.data_majoracao}</div>
            <div>
              <Link to={`/majoracao-item/${data.cd_pasta}`} state={{ data }}>
                <button className="details-button">Mais...</button>
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
    </div>
  );
};

export default MajoracaoHistorico;
