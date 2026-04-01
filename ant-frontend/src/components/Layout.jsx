import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          height: "100vh",
          background: "#0f172a",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>ANT</h2>

        <nav>
          <p>
            <Link to="/">Dashboard</Link>
          </p>
          <p>
            <Link to="/ranking">Ranking</Link>
          </p>
          <p>
            <Link to="/torneios">Torneios</Link>
          </p>
        </nav>
      </div>

      {/* Conteúdo */}
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
}

export default Layout;
