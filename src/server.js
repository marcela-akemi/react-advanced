import { dir } from "console";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const saveData = (filePath, data) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("erro ao salvar o arquivo", err);
    }
  });
};
app.get("/load/campanhas-historico", (req, res) => {
  const filePath = path.join(__dirname, "../public", "mockCampanhas.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("erro ao ler o arquivo", err);
      return res.status(500).json({ message: "internal server error" });
    }
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (parseError) {
      console.error("error parsing json", parseError);
      return res.status(500).json({ message: "internal server error" });
    }
  });
});

app.get("/load/3as-historico", (req, res) => {
  const filePath = path.join(__dirname, "../public", "mock3AS.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("erro ao ler o arquivo", err);
      return res.status(500).json({ message: "internal server error" });
    }
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (parseError) {
      console.error("error parsing json", parseError);
      return res.status(500).json({ message: "internal server error" });
    }
  });
});

app.get("/load/majoracao-historico", (req, res) => {
  const filePath = path.join(__dirname, "../public", "mockData1.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("erro ao ler o arquivo", err);
      return res.status(500).json({ message: "internal server error" });
    }
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (parseError) {
      console.error("error parsing json", parseError);
      return res.status(500).json({ message: "internal server error" });
    }
  });
});
app.post("/save/majoracao", (req, res) => {
  const filePath = path.join(__dirname, "../public", "mockData1.json");
  console.log(__dirname);
  fs.readFile(filePath, "utf8", (err, fileData) => {
    if (err) {
      console.error("erro ao ler o arquivo", err);
      return res.status(500).json({ message: "internal server error" });
    }
    const data = JSON.parse(fileData || "[]");
    data.push(req.body);
    saveData(filePath, data);
    res.status(200).json({ message: "dados salvos com sucesso." });
  });
});

app.listen(PORT, () => {
  console.log(`servidor rodando em http://localhost:${PORT}`);
});
