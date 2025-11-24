import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Musica {
  id: string;
  nome: string;
  artista: string;
  genero: string;
  ano: string;
}

interface Playlist {
  id: string;
  nome: string;
  usuarioId: string;
  musicas: Musica[];
}

const PlaylistsPage: React.FC = () => {
  const navigate = useNavigate();

  // usa exatamente a chave que o LoginPage grava
  const usuarioAtual = sessionStorage.getItem("userSession");
  const usuarioId = usuarioAtual ? JSON.parse(usuarioAtual).email : "";

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [nome, setNome] = useState("");
  const [editando, setEditando] = useState<string | null>(null);

  useEffect(() => {
    // Carrega do localStorage
    const stored = localStorage.getItem("playlists");
    const todas: Playlist[] = stored ? JSON.parse(stored) : [];

    // MIGRAÇÃO SEGURA:
    // Se houver playlists com usuarioId vazio e houver um usuário logado,
    // associamos essas playlists ao usuário atual (para que não "desapareçam").
    // Isso só roda quando 'usuarioId' NÃO está vazio.
    if (usuarioId && todas.length > 0) {
      let precisaAtualizar = false;
      const migradas = todas.map(p => {
        if (!p.usuarioId || p.usuarioId === "") {
          precisaAtualizar = true;
          return { ...p, usuarioId };
        }
        return p;
      });
      if (precisaAtualizar) {
        localStorage.setItem("playlists", JSON.stringify(migradas));
        setPlaylists(migradas);
        return;
      }
    }

    setPlaylists(todas);
  }, [usuarioId]);

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const handleCriar = () => {
    if (!nome.trim()) return alert("Digite um nome para a playlist!");
    if (!usuarioId) return alert("Você precisa estar logado para criar uma playlist.");

    const novaPlaylist: Playlist = {
      id: Date.now().toString(),
      nome,
      usuarioId,
      musicas: [],
    };

    setPlaylists(prev => [...prev, novaPlaylist]);
    setNome("");
  };

  const handleEditar = (id: string) => {
    const atualizadas = playlists.map((p) =>
      p.id === id ? { ...p, nome } : p
    );

    setPlaylists(atualizadas);
    setEditando(null);
    setNome("");
  };

  const handleExcluir = (id: string) => {
    if (confirm("Deseja excluir esta playlist?")) {
      const atualizadas = playlists.filter((p) => p.id !== id);
      setPlaylists(atualizadas);
    }
  };

  const minhasPlaylists = usuarioId ? playlists.filter((p) => p.usuarioId === usuarioId) : [];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "white",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>🎧 Minhas Playlists</h1>

        <button
          onClick={() => navigate("/home")}
          style={{
            background: "transparent",
            color: "#1DB954",
            border: "1px solid #1DB954",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ⬅ Voltar para Home
        </button>
      </header>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome da playlist..."
          style={{
            flex: 1,
            maxWidth: "400px",
            padding: "12px",
            borderRadius: "30px",
            border: "none",
            outline: "none",
            fontSize: "16px",
          }}
        />

        {editando ? (
          <button
            onClick={() => handleEditar(editando)}
            style={{
              background: "#1db954",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Salvar
          </button>
        ) : (
          <button
            onClick={handleCriar}
            style={{
              background: "#1db954",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Adicionar
          </button>
        )}
      </div>

      {!usuarioId ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>
          Você não está logado. Faça login para ver suas playlists.
        </p>
      ) : minhasPlaylists.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>
          Você ainda não criou nenhuma playlist.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {minhasPlaylists.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#181818",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>{p.nome}</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  onClick={() => navigate(`/playlist/${p.id}`)}
                  style={{
                    background: "#1db954",
                    border: "none",
                    padding: "10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Ver músicas
                </button>

                <button
                  onClick={() => {
                    setEditando(p.id);
                    setNome(p.nome);
                  }}
                  style={{
                    background: "#f1c40f",
                    border: "none",
                    padding: "10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => handleExcluir(p.id)}
                  style={{
                    background: "#e74c3c",
                    border: "none",
                    padding: "10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;
