import { useEffect, useState } from "react";

function Dashboard() {
  const [ranking, setRanking] = useState([]);
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/ranking/atletas")
      .then((res) => res.json())
      .then((data) => setRanking(data));

    fetch("http://localhost:3000/jogos")
      .then((res) => res.json())
      .then((data) => setJogos(data));
  }, []);

  return (
    <div>
      <h1>Dashboard do Atleta</h1>

      {/* Ranking */}
      <h2>🏆 Top 5 Ranking</h2>
      {ranking.slice(0, 5).map((r) => (
        <p key={r.atleta.id}>
          {r.atleta.nome} - {r.pontos} pts
        </p>
      ))}

      {/* Jogos */}
      <h2>⚔️ Últimos Jogos</h2>
      {jogos.slice(0, 5).map((jogo) => (
        <p key={jogo.id}>
          {jogo.equipeA.atleta1.nome} / {jogo.equipeA.atleta2.nome} vs{" "}
          {jogo.equipeB.atleta1.nome} / {jogo.equipeB.atleta2.nome} →{" "}
          {jogo.pontuacaoA} x {jogo.pontuacaoB}
        </p>
      ))}

      <h2>📊 Meu desempenho</h2>

      {ranking[0] && (
        <div>
          <p>Pontos: {ranking[0].pontos}</p>
          <p>Vitórias: {ranking[0].vitorias}</p>
          <p>Derrotas: {ranking[0].derrotas}</p>
          <p>Winrate: {ranking[0].winrate}%</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
