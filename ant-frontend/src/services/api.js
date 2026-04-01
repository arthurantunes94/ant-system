const API_URL = "http://localhost:3000";

export async function getAtletas() {
  const response = await fetch(`${API_URL}/atletas`);
  return response.json();
}

export async function getJogos() {
  const res = await fetch("http://localhost:3000/jogos");
  return res.json();
}

export async function getRankingEquipes() {
  const res = await fetch("http://localhost:3000/ranking/equipes");
  return res.json();
}

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
