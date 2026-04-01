const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ANT funcionando 🚀");
});

// Middleware de autenticação
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ erro: "Token não enviado" });
  }

  try {
    const decoded = jwt.verify(token, "segredo_super_secreto");
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
}

// Rota para registro de usuário
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.json(user);
});

// Rota para login de usuário
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ erro: "Senha inválida" });
  }

  const token = jwt.sign({ userId: user.id }, "segredo_super_secreto", {
    expiresIn: "1d",
  });

  res.json({ token });
});

// Rota para criar um novo atleta
app.post("/atletas", auth, async (req, res) => {
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
app.post("/equipes", auth, async (req, res) => {
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
app.post("/torneios", auth, async (req, res) => {
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
app.post("/jogos", auth, async (req, res) => {
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

// Rota para obter o ranking das equipes
app.get("/ranking/atletas", async (req, res) => {
  const jogos = await prisma.jogo.findMany({
    include: {
      equipeA: {
        include: { atleta1: true, atleta2: true },
      },
      equipeB: {
        include: { atleta1: true, atleta2: true },
      },
      orderBy: {
        data: "desc", // opcional: últimos primeiro
      },
      vencedor: {
        include: { atleta1: true, atleta2: true },
      },
    },
  });

  const ranking = {};

  // Para cada jogo, contabilizamos os pontos dos atletas
  jogos.forEach((jogo) => {
    const equipes = [jogo.equipeA, jogo.equipeB];

    // Contabilizamos os jogos para cada atleta
    equipes.forEach((equipe) => {
      [equipe.atleta1, equipe.atleta2].forEach((atleta) => {
        if (!ranking[atleta.id]) {
          ranking[atleta.id] = {
            atleta,
            pontos: 0,
            jogos: 0,
            vitorias: 0,
            derrotas: 0,
          };
        }

        ranking[atleta.id].jogos++;
      });
    });

    // vencedor ganha pontos
    const vencedores = [jogo.vencedor.atleta1, jogo.vencedor.atleta2];
    const perdedores =
      jogo.vencedorId === jogo.equipeA.id
        ? [jogo.equipeB.atleta1, jogo.equipeB.atleta2]
        : [jogo.equipeA.atleta1, jogo.equipeA.atleta2];

    // Cada atleta vencedor ganha 3 pontos
    vencedores.forEach((atleta) => {
      ranking[atleta.id].pontos += 3;
      ranking[atleta.id].vitorias++;
    });

    // Cada atleta perdedor ganha 0 pontos
    perdedores.forEach((atleta) => {
      ranking[atleta.id].derrotas++;
    });
  });

  // Calculamos o winrate e ordenamos por pontos
  const resultado = Object.values(ranking)
    .map((r) => ({
      ...r,
      winrate: r.jogos > 0 ? ((r.vitorias / r.jogos) * 100).toFixed(1) : 0,
    }))
    .sort((a, b) => b.pontos - a.pontos);

  res.json(resultado);
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
