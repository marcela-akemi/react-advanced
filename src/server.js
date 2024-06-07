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

/**CARREGAR DETALHES DA CAMPANHA */
app.get("/load/campanha-detalhes/:id_campaign", (req, res) => {
  const { id_campaign } = req.params;

  const filePath = path.join(
    __dirname,
    "../public",
    "mockCampanhasDetailItem.json"
  );
  // Read mock data from file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error!!" });
      return;
    }

    try {
      const mockData = JSON.parse(data);
      console.log("server: leitura de arquivo ok");
      const item = mockData.filter((item) => item.id_campaign === id_campaign);
      console.log(id_campaign);

      if (item) {
        res.json(item);
        console.log("tem item no arquivo?");
        console.log(item.id_campaign);
        console.log(item.cd_pasta);
      } else {
        res.status(404).json({ error: "Item not found" });
        console.log("nada foi encontrado");
      }
    } catch (error) {
      res.status(500).json({ error: "Error parsing mock data" });
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
app.post("/save/campanhas", (req, res) => {
  const filePath = path.join(__dirname, "../public", "mockCampanhasAdd.json");
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
app.post("/save/campanhas-pastas", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../public",
    "mockCampanhasPastas.json"
  );
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

/**PRICE ITEMS */

app.get("/load/price-history-item", (req, res) => {
  const cd_pasta = req.query.cd_pasta;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const filePath = path.join(
    __dirname,
    "../public",
    "mockDataPriceItemHistory.json"
  );
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("erro ao ler o arquivo", err);
      res.status(500).json({ message: "internal server error" });
      return;
    }

    const mockData = JSON.parse(data);

    const filteredData = mockData.filter(
      (item) => String(item.cd_pasta) === cd_pasta
    );

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    res.json({ page, limit, total: filteredData.length, data: paginatedData });
    console.log("ok");
  });
});

/**ATENCAO. id_field NO JSON É NUMERO MAS A FUNÇÃO BUSCA POR UM INT.
 * POR ISSO PASSEI UM STRING(...). SE 0 id_field FOR UMA STIRNG, FAVOR REMOVER.
 */
app.get("/load/details/:id_field", (req, res) => {
  const { id_field } = req.params;

  const filePath = path.join(
    __dirname,
    "../public",
    "mockDataPriceDetailItem.json"
  );
  // Read mock data from file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error!!" });
      return;
    }

    try {
      const mockData = JSON.parse(data);
      console.log("leitura de arquivo ok");
      const item = mockData.find((item) => String(item.id_field) === id_field);
      console.log(id_field);

      if (item) {
        res.json(item);
        console.log("tem item no arquivo?");
      } else {
        res.status(404).json({ error: "Item not found" });
        console.log("nada foi encontrado");
      }
    } catch (error) {
      res.status(500).json({ error: "Error parsing mock data" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`servidor rodando em http://localhost:${PORT}`);
});
