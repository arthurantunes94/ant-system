import { useEffect, useState } from "react";
import { getAtletas, createAtleta } from "../services/api";

function Atletas() {
  const [atletas, setAtletas] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // Função para carregar os atletas do backend
  async function carregarAtletas() {
    const data = await getAtletas();
    setAtletas(data);
  }

  // Carrega os atletas ao montar o componente
  useEffect(() => {
    async function fetchData() {
      const data = await getAtletas();
      setAtletas(data);
    }

    fetchData();
  }, []);

  // Função para lidar com o envio do formulário de cadastro
  async function handleSubmit(e) {
    e.preventDefault();

    await createAtleta({ nome, email });

    setNome("");
    setEmail("");

    carregarAtletas();
  }

  return (
    <div>
      <h1>Atletas</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <ul>
        {atletas.map((a) => (
          <li key={a.id}>
            {a.nome} - {a.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Atletas;
