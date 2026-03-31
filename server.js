const express = require("express");
const app = express();

app.use(express.json());

// rota principal
app.get("/", (req, res) => {
  res.send("API ANT funcionando 🚀");
});

app.get("/atletas", (req, res) => {
  const atletas = [{ nome: "João" }, { nome: "Maria" }];

  res.json(atletas);
});

// iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
