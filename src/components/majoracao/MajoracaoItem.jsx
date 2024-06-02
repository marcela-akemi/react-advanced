import React from "react";
import { Link, useLocation } from "react-router-dom";

const MajoracaoItem = () => {
  const location = useLocation();
  const { data } = location.state || {};

  if (!data) {
    return <div>Pasta não encontrada.</div>;
  }

  return (
    <div className="page-section">
      <h3>Majoração</h3>
      <div className="section-container">
        <div className="section-content">
          <div className="section-label">Pasta: </div>
          <div className="section-value">{data.cd_pasta}</div>
          <div className="section-label">Valor Alçada Máxima: </div>
          <div className="section-value">{data.vl_alcada_max}</div>
          <div className="section-label">Carteira: </div>
          <div className="section-value">{data.carteira}</div>
          <div className="section-label">Escritório: </div>
          <div className="section-value">{data.escritorio}</div>
        </div>
      </div>
    </div>
  );
};

export default MajoracaoItem;
