import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MusicasPage from "./pages/MusicasPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import PrivateRoute from "./components/PrivateRoute";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";

function AppRoutes() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/home");
  };

  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

      {/* Rotas protegidas */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/musicas"
        element={
          <PrivateRoute>
            <MusicasPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/playlists"
        element={
          <PrivateRoute>
            <PlaylistsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/playlist/:id"
        element={
          <PrivateRoute>
            <PlaylistDetailPage />
          </PrivateRoute>
        }
      />

      {/* Qualquer rota inválida redireciona para login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
