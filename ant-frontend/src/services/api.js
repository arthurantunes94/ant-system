const API_URL = "http://localhost:3000";

export async function getAtletas() {
  const response = await fetch(`${API_URL}/atletas`);
  return response.json();
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
