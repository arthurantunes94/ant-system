const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ANT funcionando 🚀");
});

// Rota para criar um novo atleta
app.post("/atletas", async (req, res) => {
  const { nome, email } = req.body;

  try {
    const atleta = await prisma.atleta.create({
      data: { nome, email },
    });

    res.json(atleta);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Rota para listar todos os atletas
app.get("/atletas", async (req, res) => {
  const atletas = await prisma.atleta.findMany();
  res.json(atletas);
});

// Rota para obter um atleta por ID
app.get("/atletas/:id", async (req, res) => {
  const id = Number(req.params.id);

  const atleta = await prisma.atleta.findUnique({
    where: { id },
  });

  res.json(atleta);
});

// Rota para deletar um atleta por ID
app.delete("/atletas/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.atleta.delete({
    where: { id },
  });

  res.json({ mensagem: "Atleta deletado" });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
