import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/3as/item.css";

const PriceDetailsItem = () => {
  const { id_field } = useParams();
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    if (id_field) {
      axios
        .get(`http://localhost:5000/load/details/${id_field}`)
        .then((response) => {
          setItemDetails(response.data);
          console.log("ok 2");
        })
        .catch((error) => {
          console.error("error when2 fetching data", error);
        });
    } else {
      console.error("ID parameter is undefined");
    }
  });

  if (!itemDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-section-item">
      <h3>Pricing Details - Price {itemDetails.id_field}</h3>
      <div className="section-container-item">
        <div className="section-content-item">
          <div className="section-label-item">ID Price:</div>
          <div className="section-value-item">{itemDetails.id_field}</div>
          <div className="section-label-item">cODIGO:</div>
          <div className="section-value-item">{itemDetails.cd_pasta}</div>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default PriceDetailsItem;
