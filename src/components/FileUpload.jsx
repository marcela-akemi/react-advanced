// src/components/FileUpload.js

import React, { useState } from "react";
import Papa from "papaparse";

const FileUpload = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setJsonData(results.data);
        },
      });
    }
  };

  const handleSubmit = async () => {
    if (jsonData) {
      try {
        const response = await fetch("https://your-api-endpoint.com/endpoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FileUpload;
