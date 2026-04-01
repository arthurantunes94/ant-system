import { useEffect, useState } from "react";
import { getJogos } from "../services/api";

function Jogos() {
  const [jogos, setJogos] = useState([]);

  // Carrega os jogos ao montar o componente
  useEffect(() => {
    async function fetchData() {
      const data = await getJogos();
      setJogos(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Jogos</h1>

      <ul>
        {jogos.map((j) => (
          <li key={j.id}>
            {j.equipeA.atleta1.nome} / {j.equipeA.atleta2.nome}
            {" vs "}
            {j.equipeB.atleta1.nome} / {j.equipeB.atleta2.nome}
            {" → "}
            {j.pontuacaoA} x {j.pontuacaoB}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jogos;
