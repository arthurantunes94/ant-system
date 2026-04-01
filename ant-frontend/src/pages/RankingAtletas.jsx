import { useEffect, useState } from "react";
import { getRankingAtletas } from "../services/api";

function RankingAtletas() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRankingAtletas();
      setRanking(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Ranking de Atletas</h1>

      <ol>
        {ranking.map((r) => (
          <li key={r.atleta.id}>
            <strong>{r.atleta.nome} </strong>
            Pontos: {r.pontos} | Jogos: {r.jogos} | Vitórias: {r.vitorias} |
            Derrotas: {r.derrotas} | 📊 Winrate: {r.winrate}%
          </li>
        ))}
      </ol>
    </div>
  );
}

export default RankingAtletas;
