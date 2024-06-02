import React, { useState } from "react";
import axios from "axios";

const cadastro = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/saveFormData", formData);
      console.log(response.data);

      setFormData({
        firstName: "",
        lastName: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="div-form">
      <form onSubmit={handleSubmit}>
        <div className="grid-item">
          <div className="grid-item">First Name:</div>
        </div>
        <div className="grid-item">Last Name:</div>
        <div className="grid-item"></div>

        <div className="grid-item">
          <input
            type="text"
            name="firstName"
            value={formData.firsName}
            onChange={handleChange}
          ></input>
        </div>
        <div className="grid-item">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          ></input>
        </div>

        <div>
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default cadastro;
