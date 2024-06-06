import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/3as/item.css";
import axios from "axios";

const AcordoComoServicoItem = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    if (data) {
      axios
        .get(
          `http://localhost:5000/load/price-history-item?cd_pasta=${data.cd_pasta}&page=${page}&limit=${limit}`
        )
        .then((response) => {
          setApiData(response.data.data);
          setTotal(response.data.total);
          console.log("ok");
        })
        .catch((error) => {
          console.error("error when fetching data", error);
        });
    }
  }, [data, page]);

  const handleNextPage = () => {
    if (page * limit < total) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (!data) {
    return <div>Pasta não encontrada.</div>;
  }

  return (
    <div className="page-section-item">
      <h3>3AS - Acordo Como Serviço</h3>
      <div className="section-container-item">
        <div className="section-content-item">
          <div className="section-label-item">Pasta: </div>
          <div className="section-value-item">{data.cd_pasta}</div>
          <div className="section-label-item">Carteira: </div>
          <div className="section-value-item">{data.carteira}</div>
          <div className="section-label-item">Escritório: </div>
          <div className="section-value-item">{data.escritorio}</div>
          <div className="section-label-item">Estratégia: </div>
          <div className="section-value-item">{data.estrategia}</div>
          <div className="section-label-item">Órgão Legal: </div>
          <div className="section-value-item">{data.orgao_legal}</div>
          <div className="section-label-item">Valor da alçada </div>
          <div className="section-value-item">{data.vl_alcada}</div>
          <div className="section-label-item">Alçada </div>
          <div className="section-value-item">{data.ds_alcada}</div>
          <div className="section-label-item">Ação </div>
          <div className="section-value-item">{data.acao}</div>
          <div className="section-label-item">Data da Audiência: </div>
          <div className="section-value-item">{data.dt_audiencia}</div>
          <div className="section-label-item">Data de inclusão: </div>
          <div className="section-value-item">{data.dt_inclusao}</div>
        </div>
      </div>

      <div className="api-data-container">
        <div className="api-data-header">
          <div className="api-data-column">ID Price</div>
          <div className="api-data-column">Codigo</div>
          <div className="api-data-column">Field 1</div>
          <div className="api-data-column">Field 2</div>
          <div className="api-data-column">Creation</div>
          <div>More</div>
        </div>
        {apiData.map((item) => (
          <div key={item.id_field} className="api-data-item">
            <div className="api-data-row">
              <div className="api-data-column">{item.id_field} </div>
              <div className="api-data-column">{item.cd_pasta} </div>
              <div className="api-data-column">{item.someField1} </div>
              <div className="api-data-column">{item.someField2} </div>
              <div className="api-data-column">{item.dt_created}</div>
              <button
                className="more-button"
                onClick={() =>
                  navigate(`/details/price-item-details/${item.id_field}`, {
                    state: { item },
                  })
                }
              >
                More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={page * limit >= total}
        >
          {" "}
          next
        </button>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};

export default AcordoComoServicoItem;
