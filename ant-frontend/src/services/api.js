const API_URL = "http://localhost:3000";

// Funções para interagir com a API do backend

// Função para obter os atletas
export async function getAtletas() {
  const response = await fetch(`${API_URL}/atletas`);
  return response.json();
}

// Função para obter os jogos
export async function getJogos() {
  const res = await fetch("http://localhost:3000/jogos");
  return res.json();
}

// Função para obter o ranking das equipes
export async function getRankingEquipes() {
  const res = await fetch("http://localhost:3000/ranking/equipes");
  return res.json();
}

// Função para criar um novo atleta
export async function createAtleta(data) {
  const response = await fetch(`${API_URL}/atletas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
