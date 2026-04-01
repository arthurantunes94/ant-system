import { useEffect, useState } from "react";
import { getRankingEquipes } from "../services/api";

function Ranking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRankingEquipes();
      setRanking(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Ranking de Equipes</h1>

      <ol>
        {ranking.map((r, index) => (
          <li key={index}>
            {r.equipe.atleta1.nome} / {r.equipe.atleta2.nome}
            {" - "}
            {r.pontos} pts ({r.jogos} jogos)
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Ranking;
