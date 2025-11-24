import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [nome, setNome] = useState("");
  const [artista, setArtista] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("playlists");
    if (!stored) return;

    const todas: Playlist[] = JSON.parse(stored);

    const encontrada = todas.find((p) => p.id === id);
    if (encontrada) {
      // garante array válido
      encontrada.musicas = encontrada.musicas || [];
      setPlaylist(encontrada);
    }
  }, [id]);

  const salvarAlteracoes = (novaPlaylist: Playlist) => {
    const stored = localStorage.getItem("playlists");
    if (!stored) return;

    const todas: Playlist[] = JSON.parse(stored);
    const atualizadas = todas.map((p) => (p.id === novaPlaylist.id ? novaPlaylist : p));

    localStorage.setItem("playlists", JSON.stringify(atualizadas));
  };

  const handleAdicionar = () => {
    if (!nome || !artista || !genero || !ano) {
      alert("Preencha todos os campos!");
      return;
    }

    if (isNaN(Number(ano))) {
      alert("Ano deve ser um número.");
      return;
    }

    if (!playlist) return;

    const novaMusica: Musica = {
      id: Date.now().toString(),
      nome,
      artista,
      genero,
      ano,
    };

    const atualizada: Playlist = {
      ...playlist,
      musicas: [...playlist.musicas, novaMusica],
    };

    setPlaylist(atualizada);
    salvarAlteracoes(atualizada);

    setNome("");
    setArtista("");
    setGenero("");
    setAno("");
  };

  const handleExcluir = (musicaId: string) => {
    if (!playlist) return;

    const atualizada = {
      ...playlist,
      musicas: playlist.musicas.filter((m) => m.id !== musicaId),
    };

    setPlaylist(atualizada);
    salvarAlteracoes(atualizada);
  };

  if (!playlist)
    return <p style={{ padding: 20 }}>Playlist não encontrada.</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto", color: "white" }}>
      <h1>🎵 Playlist: {playlist.nome}</h1>

      <button
        onClick={() => navigate("/playlists")}
        style={{
          background: "#444",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        ← Voltar
      </button>

      <h2>Adicionar Música</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Artista"
          value={artista}
          onChange={(e) => setArtista(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Gênero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <button
        onClick={handleAdicionar}
        style={{
          background: "#28a745",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        Adicionar Música
      </button>

      <h2>Músicas na Playlist</h2>

      {playlist.musicas.length === 0 ? (
        <p>Nenhuma música adicionada ainda.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {playlist.musicas.map((m) => (
            <li
              key={m.id}
              style={{
                background: "#222",
                color: "white",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{m.nome}</strong> — {m.artista} ({m.ano})
                <br />
                <small>{m.genero}</small>
              </div>

              <button
                onClick={() => handleExcluir(m.id)}
                style={{
                  background: "#dc3545",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaylistDetailPage;
