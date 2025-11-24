import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage({
  onLoginSuccess,
}: {
  onLoginSuccess: () => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  const [registeredUser, setRegisteredUser] = useState<{
    email: string;
    password: string;
  }>({
    email: "teste@site.com",
    password: "123456",
  });

  // 🔄 Carregar usuário salvo anteriormente
  useEffect(() => {
    const savedUser = localStorage.getItem("registeredUser");
    if (savedUser) {
      try {
        setRegisteredUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Erro ao ler usuário salvo:", e);
      }
    }
  }, []);

  const handleSubmit = (email: string, password: string) => {
    if (mode === "register") {
      if (!email || !password) {
        alert("Preencha todos os campos!");
        return;
      }

      if (password.length < 4) {
        alert("A senha deve ter pelo menos 4 caracteres.");
        return;
      }

      const newUser = { email, password };
      setRegisteredUser(newUser);
      localStorage.setItem("registeredUser", JSON.stringify(newUser));

      alert("Conta criada com sucesso!");
      setMode("login");
      return;
    }

    // LOGIN
    if (email === registeredUser.email && password === registeredUser.password) {
      alert("Login realizado!");

      const loginData = {
        email,
        lastLogin: new Date().toLocaleString(),
      };

      sessionStorage.setItem("userSession", JSON.stringify(loginData));

      onLoginSuccess();
      navigate("/home");
    } else {
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(180deg, #0f0f0f, #1a1a1a)",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#1DB954" }}>Song Flow 🎶</h1>

      <AuthForm type={mode} onSubmit={handleSubmit} />

      <p style={{ marginTop: "15px" }}>
        {mode === "login" ? (
          <>
            Não tem uma conta?{" "}
            <button
              onClick={() => setMode("register")}
              style={{
                background: "none",
                border: "none",
                color: "#1DB954",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Cadastre-se
            </button>
          </>
        ) : (
          <>
            Já tem uma conta?{" "}
            <button
              onClick={() => setMode("login")}
              style={{
                background: "none",
                border: "none",
                color: "#1DB954",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Entrar
            </button>
          </>
        )}
      </p>
    </div>
  );
}
