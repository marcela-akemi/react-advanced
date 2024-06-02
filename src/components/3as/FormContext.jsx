import React, { createContext, useState, useEffect } from "react";

// Create the context
const FormContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    cd_pasta: "",
    carteira: "",
    escritorio: "",
    estrategia: "",
    orgao_legal: "",
    vl_alcada_max: "",
    data_audiencia: "",
    data_inclusao: "",
    month: [],
    selectedMonth: "",
  });

  // Fetch data from the database (simulate with useEffect)
  useEffect(() => {
    // Simulate a fetch from the Aurora PostgreSQL database
    const fetchData = async () => {
      // Simulated data fetching
      const monthsData = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(["January", "February", "March", "April"]);
        }, 1000);
      });

      const formDetails = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            cd_pasta: "222333444",
            carteira: "Carteira X",
            escritorio: "Umbrella Corporation",
            estrategia: "Defesa",
            orgao_legal: "CEJUSC",
            vl_alcada_max: "100000",
            data_audiencia: "2024-05-01",
            data_inclusao: "2024-01-01",
          });
        }, 1000);
      });

      setFormData({
        ...formDetails,
        month: monthsData,
        selectedMonth: "",
      });
    };

    fetchData();
  }, []);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
