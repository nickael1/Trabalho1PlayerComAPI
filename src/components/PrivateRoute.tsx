import { Navigate } from "react-router-dom";


interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  // Verifica se há sessão salva
  const userSession = sessionStorage.getItem("userSession");

  // Se não houver sessão → redireciona para /login
  if (!userSession) {
    return <Navigate to="/login" replace />;
  }

  // Caso contrário → renderiza a rota normalmente
  return children;
}
