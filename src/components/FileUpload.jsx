import React, { useState } from "react";
import axios from "axios";

const CsvUploader = () => {
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const textType = /text.*/;

    if (file.type.match(textType)) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFileContent(reader.result);
        setError("");
        sendFileContentToApi(reader.result);
      };

      reader.readAsText(file);
    } else {
      setFileContent("");
      setError("File not supported!");
    }
  };

  const sendFileContentToApi = async (content) => {
    try {
      const response = await axios.post("http://localhost:5000/upload", {
        content,
      });
      console.log("file send sucessfully", response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      <div id="fileDisplayArea">
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <pre>{fileContent}</pre>
        )}
      </div>
    </div>
  );
};

export default CsvUploader;
