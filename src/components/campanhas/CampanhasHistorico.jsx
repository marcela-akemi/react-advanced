import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/3as/historico.css";

const CampanhasHistorico = () => {
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
          "http://localhost:5000/load/campanhas-historico"
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
      <h1>Campanhas</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Pesquisar por PASTA, ESCRITORIO ou CARTEIRA"
        ></input>
        <Link to="/campanhas">
          <button>Adicionar</button>
        </Link>
      </div>
      <div className="previous-entries-container-campanhas">
        <div className="entries-container-campanhas header-row">
          <div className="section-label">ID</div>
          <div className="section-label">Pasta</div>
          <div className="section-label">Nome da Campanha</div>

          <div className="section-label">Status</div>
          <div className="section-label">Data Início</div>
          <div className="section-label">Data Fim</div>
          <div className="section-label">Data Inclusão</div>

          <div></div>
        </div>
        {currentEntries.map((data, index) => (
          <div className="entries-container-campanhas" key={index}>
            <div className="section-value">{data.id_campaign}</div>
            <div className="section-value">{data.cd_pasta}</div>
            <div className="section-value">{data.campanha_nome}</div>

            <div className="section-value">{data.status}</div>
            <div className="section-valie">{data.dt_vigencia_inicio}</div>
            <div className="section-value">{data.dt_vigencia_fim}</div>
            <div className="section-value">{data.dt_inclusao}</div>
            <div>
              <Link to={`/campanhas-item/${data.id_campaign}`} state={{ data }}>
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
      <button className="back-button" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};

export default CampanhasHistorico;
