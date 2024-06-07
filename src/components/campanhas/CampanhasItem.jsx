import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const CampanhasItem = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const { id_campaign } = useParams();
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    console.log(id_campaign);
    if (id_campaign) {
      axios
        .get(`http://localhost:5000/load/campanha-detalhes/${data.id_campaign}`)
        .then((response) => {
          setApiData(response.data);
        })
        .catch((error) => {
          console.error("error when fetching data", error);
        });
    }
  }, [id_campaign]);

  return (
    <div className="campanhas">
      <div className="campanhas-titulo-container">
        <h3>Campanhas</h3>
        <button className="campanhas-button-parar">PARAR CAMPANHA</button>
      </div>
      <div className="campanhas-container">
        <div className="campanhas-row header">
          <div className="campanhas-label">ID Campanha:</div>
          <div className="campanhas-label">Nome da Campanha:</div>
          <div className="campanhas-label">Tipo de Negociação</div>
          <div className="campanhas-label">Criado por </div>
        </div>
        <div className="campanhas-row">
          <div className="campanhas-value"> {data.id_campaign}</div>
          <div className="campanhas-value"> {data.campanha_nome}</div>
          <div className="campanhas-value">{data.tipo_negociacao}</div>
          <div className="campanhas-value">{data.usuario}</div>
        </div>
      </div>
      <h3>Pastas</h3>
      <div className="campanhas-container">
        <div className="campanhas-row header">
          <div className="campanhas-column">ID Campanha</div>
          <div className="campanhas-column">Código</div>
          <div className="campanhas-column">Status</div>
          <div className="campanhas-column">Data de Inserção</div>
          <div className="campanhas-column">Inserido por</div>
        </div>
        {apiData.map((item, index) => (
          <div key={index} className="campanhas-row">
            <div className="campanhas-column">{item.id_campaign}</div>
            <div className="campanhas-column">{item.cd_pasta}</div>
            <div className="campanhas-column">{item.status}</div>
            <div className="campanhas-column">{item.dt_inclusao}</div>
            <div className="campanhas-column">{item.usuario}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampanhasItem;
