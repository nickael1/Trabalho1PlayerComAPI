import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    try {
      const session = sessionStorage.getItem("userSession");
      if (session) {
        setUserData(JSON.parse(session));
      }
    } catch (err) {
      console.error("Erro ao ler sessionStorage:", err);
      sessionStorage.clear();
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    alert("Você saiu da conta.");
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "#121212",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {/* Cabeçalho */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "#1DB954" }}>Song Flow 🎧</h1>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            color: "#1DB954",
            border: "1px solid #1DB954",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Sair
        </button>
      </div>

      {userData && (
        <p style={{ marginBottom: "30px", textAlign: "center" }}>
          Bem-vindo, <strong>{userData.email}</strong>! <br />
          Último login: <strong>{userData.lastLogin}</strong>
        </p>
      )}

      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Buscar músicas ou artistas..."
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          marginBottom: "30px",
          background: "#1e1e1e",
          color: "white",
        }}
      />

      {/* Botões de navegação */}
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={() => navigate("/musicas")}
          style={{
            background: "#1DB954",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Músicas 🎵
        </button>

        <button
          onClick={() => navigate("/playlists")}
          style={{
            background: "#1DB954",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Playlists 🎧
        </button>
      </div>
    </div>
  );
}
