// Page1.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import Papa from "papaparse";
import "../../styles/addnew.css";
import ReactFileReader from "react-file-reader";
import FileUpload from "../FileUpload";

const Campanhas = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  /*const handleSubmit = async (e) => {
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
  };*/

  const handleFiles = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const csvData = Papa.parse(e.target.result, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });

      const data = csvData.data.map((item) => ({
        id_campaign_item: item.id_campaign_item,
        id_campaign: item.id_campaign,
        campaign_item: item.campaign_item,
      }));

      try {
        setLoading(true);
        const response = await axios.post(
          `https://localhost:51388/api/Campaign/upload`,
          csvData.data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Error uploading data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="add-entry-container">
        <h2>Adicionar nsovo registro</h2>
        <form className="add-entry-form">
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
              <button type="submit">Enviar</button>

              <div>
                <h1>CSV Uploader</h1>
                <input type="file" onChange={handleFiles} accept=".csv" />
                <button onClick={handleFiles} disabled={loading}>
                  {loading ? "Uploading ..." : "Upload CSV"}
                </button>

                {message && <p>{message}</p>}
              </div>
              <button type="button">Back</button>
            </div>
            <FileUpload />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Campanhas;
