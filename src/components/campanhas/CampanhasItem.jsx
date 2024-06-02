import React from "react";
import { Link, useLocation } from "react-router-dom";

const CampanhasItem = () => {
  const location = useLocation();
  const { data } = location.state || {};

  if (!data) {
    return <div>Pasta não encontrada.</div>;
  }

  return (
    <div>
      <div>
        <h3>Campanhas</h3>
        <div>Pasta: {data.cd_pasta}</div>
        <div>Carteira: {data.carteira}</div>
        <div>Escritório: {data.escritorio}</div>
      </div>
    </div>
  );
};

export default CampanhasItem;
