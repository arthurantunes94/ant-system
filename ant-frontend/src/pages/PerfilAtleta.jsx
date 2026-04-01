import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PerfilAtleta() {
  const { id } = useParams();

  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/atletas/${id}/jogos`)
      .then((res) => res.json())
      .then((data) => setJogos(data));
  }, [id]);

  return (
    <div>
      <h1>Perfil do Atleta</h1>

      <h2>Histórico de Jogos</h2>

      {jogos.map((jogo) => {
        const ganhou =
          (jogo.vencedorId === jogo.equipeA.id &&
            (jogo.equipeA.atleta1.id == id || jogo.equipeA.atleta2.id == id)) ||
          (jogo.vencedorId === jogo.equipeB.id &&
            (jogo.equipeB.atleta1.id == id || jogo.equipeB.atleta2.id == id));

        return (
          <p key={jogo.id} style={{ color: ganhou ? "green" : "red" }}>
            {ganhou ? "Vitória" : "Derrota"} - {jogo.equipeA.atleta1.nome} /{" "}
            {jogo.equipeA.atleta2.nome}
            {" vs "}
            {jogo.equipeB.atleta1.nome} / {jogo.equipeB.atleta2.nome}
            {" → "}
            {jogo.pontuacaoA} x {jogo.pontuacaoB}
          </p>
        );
      })}
    </div>
  );
}

export default PerfilAtleta;
