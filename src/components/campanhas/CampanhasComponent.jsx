// Page1.jsx
import React, { useState } from "react";
import axios from "axios";
import "../../styles/addnew.css";

const Campanhas = () => {
  const [formData, setFormData] = useState({
    campanha_nome: "",
    campanha_objetivo: "",
    filtro1: "",
    filtro2: "",
    data_vigencia_inicio: "",
    data_vigencia_termino: "",
    isActive1: false,
    isActive2: false,
    isActive3: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/save/campanhas", formData);

      alert("dados salvos com sucesso");

      setFormData({
        campanha_nome: "",
        campanha_objetivo: "",
        filtro1: "",
        filtro2: "",
        data_vigencia_inicio: "",
        data_vigencia_termino: "",
        isActive1: false,
        isActive2: false,
        isActive3: false,
      });
    } catch (error) {
      console.error("Erro ao salvaro dados: ", error);
    }
  };
  // const validarDatasVigencia = () => {
  //   const validacaoError = {};
  //   const hoje = new Date().toISOString.split("T")[0];

  //   if (!formData.campanha_nome) {
  //     validacaoError.campanha_nome = "Favor inserir nome da CAMPANHA";
  //   }
  //   if (!formData.data_vigencia_inicio) {
  //     validacaoError.data_vigencia_inicio =
  //       "É necessário inserir uma data de vigência";
  //   } else if (formData.data_vigencia_inicio < hoje) {
  //     validacaoError.data_vigencia_inicio =
  //       "Data de início não pode ser anterior ao dia de hoje.";
  //   }
  //   if (!formData.data_vigencia_termino) {
  //     validacaoError.data_vigencia_termino =
  //       "É necessário inserir a data de término da vigência";
  //   } else if (formData.data_vigencia_termino < hoje) {
  //     validacaoError.data_vigencia_termino =
  //       "A data de término da vigência não pode ser anterior ao dia de hoje";
  //   } else if (formData.data_vigencia_termino < formData.data_vigencia_inicio) {
  //     validacaoError.data_vigencia_termino =
  //       "A data de término não pode ser anterior a data de início.";
  //   }

  //   setFormErrors(validacaoError);
  //   return Object.keys(validacaoError).length === 0;
  // };

  return (
    <div>
      <div className="add-entry-container">
        <h2>Adicionar novo registro</h2>
        <form onSubmit={handleSubmit} className="add-entry-form">
          <div className="form-column">
            <div className="form-group">
              <label>Registro</label>
              <label>Objetivo da Registro</label>
              <input
                type="text"
                name="campanha-nome"
                value={formData.campanha_nome}
                onChange={handleChange}
              />
              <input
                type="text"
                name="campanha-objetivo"
                value={formData.campanha_objetivo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Tipo Filtro 1</label>
            <label>Tipo Filtro 2</label>
            <select
              name="filtro1"
              value={formData.filtro1}
              onChange={handleChange}
            >
              <option value="">SELECIONE</option>
              <option value="1">Opção 1.1</option>
              <option value="2">Opção 1.2</option>
              <option value="3">Opção 1.3</option>
            </select>
            <select
              name="filtro2"
              value={formData.filtro2}
              onChange={handleChange}
            >
              <option value="">SELECIONE</option>
              <option value="1">Opção 2.1</option>
              <option value="2">Opção 2.2</option>
              <option value="3">Opção 2.3</option>
            </select>
          </div>
          <div className="form-column">
            <div className="form-group">
              <label>Data Vigência Início</label>
              <label>Data Vigência Término</label>
              <input
                type="date"
                name="data-vigencia-inicio"
                value={formData.data_vigencia_inicio}
                onChange={handleChange}
              />
              <input
                type="date"
                name="data-vigencia-termino"
                value={formData.data_vigencia_termino}
                onChange={handleChange}
              />
            </div>
            <div className="form-group"></div>

            <div className="form-group checkbox-group">
              <label>Checkbox 1</label>
              <input
                type="checkbox"
                name="isActive1"
                checked={formData.isActive1}
                onChange={handleChange}
              />
            </div>
            <div className="form-group checkbox-group">
              <label>Checkbox 2</label>
              <input
                type="checkbox"
                name="isActive2"
                checked={formData.isActive2}
                onChange={handleChange}
              />
            </div>
            <div className="form-group checkbox-group">
              <label>Checkbox 3</label>
              <input
                type="checkbox"
                name="isActive2"
                checked={formData.isActive3}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="form-actions">
        <button type="submit" onClick={handleSubmit}>
          Enviar
        </button>

        <button type="button">Back</button>
      </div>
    </div>
  );
};

export default Campanhas;
