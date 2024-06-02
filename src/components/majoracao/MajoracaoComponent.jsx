// Page1.jsx
import React, { useState } from "react";
import axios from "axios";

const Majoracao = () => {
  const [formData, setFormData] = useState({
    id_majoracao: "",
    cd_pasta: "",
    ds_alcada: "",
    vl_alcada: "",
    vl_alcada_max: "",
    carteira: "",
    data_majoracao: "",
    data_audiencia: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/save/majoracao", formData);

      alert("dados salvos com sucesso");

      setFormData({
        id_majoracao: "",
        cd_pasta: "",
        ds_alcada: "",
        vl_alcada: "",
        vl_alcada_max: "",
        carteira: "",
        data_majoracao: "",
        data_audiencia: "",
      });
    } catch (error) {
      console.error("Erro ao salvaro dados: ", error);
    }
  };

  return (
    <div className="page-section">
      <h1>Majoração</h1>
      <div className="section-container">
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label htmlFor="cd_pasta">Código Pasta</label>
            <input
              type="text"
              name="cd_pasta"
              value={formData.cd_pasta}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ds_alcada">Nível Alçada</label>
            <input
              type="text"
              name="ds_alcada"
              value={formData.ds_alcada}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vl_alcada">Valor Alçada</label>
            <input
              type="text"
              name="vl_alcada"
              value={formData.vl_alcada}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="carteira">Carteira</label>
            <input
              type="text"
              name="carteira"
              value={formData.carteira}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="data_majoracao">Data Majoração</label>
            <input
              type="text"
              name="data_majoracao"
              value={formData.data_majoracao}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Salvar Dados</button>
        </form>
      </div>
    </div>
  );
};

export default Majoracao;
