import React from "react";
import { Link, useLocation } from "react-router-dom";

const AcordoComoServicoItem = () => {
  const location = useLocation();
  const { data } = location.state || {};

  if (!data) {
    return <div>Pasta não encontrada.</div>;
  }

  return (
    <div className="page-section">
      <h3>3AS - Acordo Como Serviço</h3>
      <div className="section-container">
        <div className="section-content">
          <div className="section-label">Pasta: </div>
          <div className="section-value">{data.cd_pasta}</div>
          <div className="section-label">Carteira: </div>
          <div className="section-value">{data.carteira}</div>
          <div className="section-label">Escritório: </div>
          <div className="section-value">{data.escritorio}</div>
          <div className="section-label">Estratégia: </div>
          <div className="section-value">{data.estrategia}</div>
          <div className="section-label">Órgão Legal: </div>
          <div className="section-value">{data.orgao_legal}</div>
          <div className="section-label">Data da Audiência: </div>
          <div className="section-value">{data.data_audiencia}</div>
          <div className="section-label">Data de inclusão: </div>
          <div className="section-value">{data.data_inclusao}</div>
        </div>
      </div>
    </div>
  );
};

export default AcordoComoServicoItem;
