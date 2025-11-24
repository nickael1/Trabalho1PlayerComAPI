import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MusicasPage() {
  const [search, setSearch] = useState("");
  const [musicas, setMusicas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [tipoPesquisa, setTipoPesquisa] = useState<"musica" | "artista" | "album">("artista");

  const navigate = useNavigate();

  // Carrega favoritos
  useEffect(() => {
    try {
      const favs = sessionStorage.getItem("favoritos");
      if (favs) setFavoritos(JSON.parse(favs));
    } catch {
      console.error("Erro ao ler favoritos!");
    }
  }, []);

  // Atualiza favoritos no storage
  useEffect(() => {
    sessionStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Digite algo para pesquisar!");
      return;
    }

    setError("");
    setMusicas([]);
    setLoading(true);

    try {
      let url = "";

      if (tipoPesquisa === "musica") {
        url = `https://www.theaudiodb.com/api/v1/json/2/searchtrack.php?t=${encodeURIComponent(search)}`;
      } else if (tipoPesquisa === "artista") {
        url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(search)}`;
      } else {
        url = `https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?a=${encodeURIComponent(search)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (tipoPesquisa === "artista") {
        if (!data.artists) {
          setError("Nenhum artista encontrado 😕");
        } else {
          const artist = data.artists[0].strArtist;

          const resTracks = await fetch(
            `https://www.theaudiodb.com/api/v1/json/2/track-top10.php?s=${encodeURIComponent(artist)}`
          );
          const tracks = await resTracks.json();

          setMusicas(tracks.track ? tracks.track.slice(0, 10) : []);
        }
      }

      if (tipoPesquisa === "musica") {
        if (!data.track) setError("Nenhuma música encontrada 😕");
        else setMusicas(data.track.slice(0, 10));
      }

      if (tipoPesquisa === "album") {
        if (!data.album) setError("Nenhum álbum encontrado 😕");
        else setMusicas(data.album.slice(0, 10));
      }

    } catch (err) {
      setError("Erro ao buscar dados 😔");
    } finally {
      setLoading(false);
    }
  };


  const toggleFavorito = (item: any) => {
    const id = item.idTrack || item.idAlbum;

    const existe = favoritos.some((f) => (f.idTrack || f.idAlbum) === id);

    if (existe) {
      setFavoritos(favoritos.filter((f) => (f.idTrack || f.idAlbum) !== id));
    } else {
      setFavoritos([...favoritos, item]);
    }
  };


  return (
    <div
      style={{
        background: "#121212",
        color: "white",
        minHeight: "100vh",
        padding: "30px 20px",
      }}
    >
      {/* Botão Voltar */}
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
          marginBottom: "20px",
        }}
      >
        ⬅ Voltar para Home
      </button>

      <h1
        style={{
          color: "#1DB954",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        🔎 Buscar Músicas
      </h1>

      {/* Botões seleção */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {["musica", "artista", "album"].map((tipo) => (
          <button
            key={tipo}
            onClick={() => setTipoPesquisa(tipo as any)}
            style={{
              background: tipoPesquisa === tipo ? "#1DB954" : "#1e1e1e",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s",
            }}
          >
            {tipo === "musica" && "🎵 Música"}
            {tipo === "artista" && "👤 Artista"}
            {tipo === "album" && "💿 Álbum"}
          </button>
        ))}
      </div>

      {/* Barra de busca */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Buscar por ${tipoPesquisa}...`}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "#1e1e1e",
            color: "white",
            width: "250px",
          }}
        />
        <button
          type="submit"
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
          Buscar
        </button>
      </form>

      {loading && <p style={{ textAlign: "center" }}>Carregando...</p>}
      {error && (
        <p style={{ textAlign: "center", color: "#f44336" }}>{error}</p>
      )}

      {/* Resultados */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {musicas.map((m) => {
          const id = m.idTrack || m.idAlbum;
          const isFav = favoritos.some((f) => (f.idTrack || f.idAlbum) === id);

          return (
            <div
              key={id}
              style={{
                background: "#1e1e1e",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              }}
            >
              {(m.strTrackThumb || m.strAlbumThumb) ? (
                <img
                  src={m.strTrackThumb || m.strAlbumThumb}
                  alt={m.strTrack || m.strAlbum}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "150px",
                    background: "#333",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#aaa",
                  }}
                >
                  Sem imagem
                </div>
              )}

              <h3>{m.strTrack || m.strAlbum}</h3>

              <p style={{ fontSize: "0.9em", color: "#aaa" }}>
                {m.strArtist || "Artista desconhecido"}
              </p>

              <p style={{ fontSize: "0.8em", color: "#1DB954" }}>
                {m.strGenre || "Gênero não informado"}
              </p>

              <p style={{ fontSize: "0.8em", color: "#888" }}>
                {m.intYearReleased || "Ano N/A"}
              </p>

              <button
                onClick={() => toggleFavorito(m)}
                style={{
                  marginTop: "10px",
                  background: isFav ? "#f44336" : "#1DB954",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {isFav ? "Remover ❤️" : "Adicionar aos favoritos 💚"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
