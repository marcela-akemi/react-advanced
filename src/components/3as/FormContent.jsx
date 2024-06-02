import React, { useContext } from "react";
import FormContext from "./FormContext";
import "../../styles/styles.css";

const FormComponent = () => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropdownChange = (e) => {
    setFormData({
      ...formData,
      selectedMonth: e.target.value,
    });
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Código Pasta</label>
          <input
            type="text"
            name="cd_pasta"
            value={formData.cd_pasta}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Carteira</label>
          <input
            type="text"
            name="carteira"
            value={formData.carteira}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Estratégia</label>
          <input
            type="text"
            name="estrategia"
            value={formData.estrategia}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Órgão Legal</label>
          <input
            type="text"
            name="orgao_legal"
            value={formData.orgao_legal}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Alçada Máxima</label>
          <input
            type="text"
            name="vl-alçada-maxima"
            value={formData.vl_alcada_max}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Data Audiência</label>
          <input
            type="text"
            name="data-audiencia"
            value={formData.data_audiencia}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Data Inclusão</label>
          <input
            type="text"
            name="data-inclusao"
            value={formData.data_inclusao}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Month:</label>
          <select
            name="selectedMonth"
            value={formData.selectedMonth}
            onChange={handleDropdownChange}
          >
            <option value="">Select a month</option>
            {formData.month.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
