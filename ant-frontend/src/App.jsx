import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Ranking from "./pages/Ranking";
import Torneios from "./pages/Torneios";
import PerfilAtleta from "./pages/PerfilAtleta";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/torneios" element={<Torneios />} />
          <Route path="/atleta/:id" element={<PerfilAtleta />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
