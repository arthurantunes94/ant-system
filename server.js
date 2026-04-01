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

// Rota para criar uma nova equipe
app.post("/equipes", async (req, res) => {
  const { atleta1Id, atleta2Id } = req.body;

  const equipe = await prisma.equipe.create({
    data: {
      atleta1Id,
      atleta2Id,
    },
  });

  res.json(equipe);
});

// Rota para listar todas as equipes
app.get("/equipes", async (req, res) => {
  const equipes = await prisma.equipe.findMany({
    include: {
      atleta1: true,
      atleta2: true,
    },
  });

  res.json(equipes);
});

// Rota para criar um novo torneio
app.post("/torneios", async (req, res) => {
  const { nome, data } = req.body;

  const torneio = await prisma.torneio.create({
    data: {
      nome,
      data: new Date(data),
    },
  });

  res.json(torneio);
});

// Rota para listar todos os torneios
app.get("/torneios", async (req, res) => {
  const torneios = await prisma.torneio.findMany();
  res.json(torneios);
});

// Rota para criar um novo jogo
app.post("/jogos", async (req, res) => {
  const { equipeAId, equipeBId, pontuacaoA, pontuacaoB, torneioId } = req.body;

  const vencedorId = pontuacaoA > pontuacaoB ? equipeAId : equipeBId;

  const jogo = await prisma.jogo.create({
    data: {
      equipeAId,
      equipeBId,
      pontuacaoA,
      pontuacaoB,
      vencedorId,
      torneioId,
    },
  });

  res.json(jogo);
});

// Rota para listar todos os jogos
app.get("/jogos", async (req, res) => {
  const jogos = await prisma.jogo.findMany({
    include: {
      equipeA: {
        include: {
          atleta1: true,
          atleta2: true,
        },
      },
      equipeB: {
        include: {
          atleta1: true,
          atleta2: true,
        },
      },
      vencedor: {
        include: {
          atleta1: true,
          atleta2: true,
        },
      },
      torneio: true,
    },
  });

  res.json(jogos);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
