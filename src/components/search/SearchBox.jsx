import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/searchbox.css";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      try {
        const response = await fetch("/mockData.json");
        const data = await response.json();
        const result = data.find(
          (item) =>
            item.cd_pasta.toLowerCase() === searchTerm.toLocaleLowerCase()
        );

        if (result) {
          navigate("/search-results", { state: { data: result } });
        } else {
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        navigate("/not-found");
      }
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Pesquisar por PASTA..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
};

export default SearchBox;
