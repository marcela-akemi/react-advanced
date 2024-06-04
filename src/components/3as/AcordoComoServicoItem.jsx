import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/3as/item.css";

const AcordoComoServicoItem = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();

  if (!data) {
    return <div>Pasta não encontrada.</div>;
  }

  return (
    <div className="page-section-item">
      <h3>3AS - Acordo Como Serviço</h3>
      <div className="section-container-item">
        <div className="section-content-item">
          <div className="section-label-item">Pasta: </div>
          <div className="section-label-item">Carteira: </div>
          <div className="section-value-item">{data.cd_pasta}</div>
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
      <button className="back-button" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};

export default AcordoComoServicoItem;
