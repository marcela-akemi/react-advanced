// Page1.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import { render } from "react-dom";
import ReactDOM from "react-dom";

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

  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [uploadedItems, setUploadedItems] = useState([]);
  const fileInuptRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/save/campanhas", formData);

      alert("dados salvos com sucesso");
      setIsUploadEnabled(true);
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        const items = csvData.split("\n").map((item) => item.trim());
        const jsonData = items.map((row, index) => ({
          cd_pasta: row.trim(),
          status: 1,
          dt_inclusao: new Date().toISOString(),
        }));
        setUploadedItems(jsonData);
      };

      reader.readAsText(file);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/save/campanhas-pastas",
        uploadedItems
      );
      alert("csv lido com sucesso");
      setUploadedItems;
    } catch (error) {
      console.error("erro ao consumir CSV", error);
    }
  };

  return (
    <div>
      <div className="add-entry-container">
        <h2>Adicionar nsovo registro</h2>
        <form onSubmit={handleSubmit} className="add-entry-form">
          <div className="form-column">
            <div className="form-group">
              <label>Registro</label>
              <label>Objetivo da Registro</label>
              <input
                type="text"
                name="campanha_nome"
                value={formData.campanha_nome}
                onChange={handleChange}
              />
              <input
                type="text"
                name="campanha_objetivo"
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
                name="data_vigencia_inicio"
                value={formData.data_vigencia_inicio}
                onChange={handleChange}
              />
              <input
                type="date"
                name="data_vigencia_termino"
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
                name="isActive3"
                checked={formData.isActive3}
                onChange={handleChange}
              />
            </div>
            <div className="form-actions">
              <button type="submit" onClick={handleSubmit}>
                Enviar
              </button>

              <button type="button">Back</button>
            </div>
          </div>
        </form>

        {isUploadEnabled && (
          <form onSubmit={handleUploadSubmit} className="upload-form">
            <div className="file-upload-container">
              <h3>Upload CSV file</h3>
              <input
                type="file"
                ref={fileInuptRef}
                accept=".csv"
                onChange={handleFileUpload}
              />
              <button type="submit">Upload</button>
            </div>
            <div className="uploaded-data-container">
              <h3>Uploaded items</h3>
              <div className="uploaded-data-grid">
                <div className="uploaded-data-header">
                  <span>Pasta</span>
                  <span>Status</span>
                  <span>Data Inclusão</span>
                </div>
                {uploadedItems.map((item, index) => (
                  <div className="uploaded-data-row" key={index}>
                    <span>{item.cd_pasta}</span>
                    <span>{item.status}</span>
                    <span>{new Date(item.dt_inclusao).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Campanhas;
