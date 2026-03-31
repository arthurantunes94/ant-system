import { useEffect, useState } from "react";
import { getAtletas, createAtleta } from "../services/api";

function Atletas() {
  const [atletas, setAtletas] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  async function carregarAtletas() {
    const data = await getAtletas();
    setAtletas(data);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getAtletas();
      setAtletas(data);
    }

    fetchData();
  }, []);

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
