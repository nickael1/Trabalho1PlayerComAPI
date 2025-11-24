import axios from "axios";

const BASE_URL = "https://www.theaudiodb.com/api/v1/json/2";

// 🔍 Buscar músicas por artista
export const searchByArtist = async (artista: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=${artista}`);
    return response.data.artists || [];
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    return [];
  }
};

// 🔍 Buscar músicas populares (exemplo: retorna 3 aleatórias)
export const getPopularSongs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mostloved.php?format=track`);
    return response.data.loved?.slice(0, 3) || [];
  } catch (error) {
    console.error("Erro ao buscar músicas populares:", error);
    return [];
  }
};
