export interface Musica {
  id: string;
  nome: string;
  artista: string;
  genero: string;
  ano: string;
}

export interface Playlist {
  id: string;
  nome: string;
  usuarioId: string;
  musicas: Musica[];
}

// 🔹 Carregar playlists do LocalStorage
export const getPlaylists = (): Playlist[] => {
  const data = localStorage.getItem("playlists");
  return data ? JSON.parse(data) : [];
};

// 🔹 Salvar playlists
export const savePlaylists = (playlists: Playlist[]) => {
  localStorage.setItem("playlists", JSON.stringify(playlists));
};

// 🔹 Adicionar playlist
export const addPlaylist = (playlist: Playlist) => {
  const playlists = getPlaylists();
  playlists.push(playlist);
  savePlaylists(playlists);
};

// 🔹 Atualizar playlist
export const updatePlaylist = (updated: Playlist) => {
  const playlists = getPlaylists().map((p) =>
    p.id === updated.id ? updated : p
  );
  savePlaylists(playlists);
};

// 🔹 Excluir playlist
export const deletePlaylist = (id: string) => {
  const playlists = getPlaylists().filter((p) => p.id !== id);
  savePlaylists(playlists);
};
