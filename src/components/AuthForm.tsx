import { useState } from "react";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (email: string, password: string) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Digite um email válido.");
      return false;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "320px",
        background: "#121212",
        padding: "32px",
        borderRadius: "10px",
        color: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "5px" }}>
        {type === "login" ? "Entrar" : "Criar Conta"}
      </h2>

      {/* Email */}
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        style={{
          padding: "12px",
          borderRadius: "6px",
          border: "1px solid #333",
          background: "#1c1c1c",
          color: "white",
        }}
      />

      {/* Senha */}
      <input
        type="password"
        required
        placeholder="Senha"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error) setError("");
        }}
        style={{
          padding: "12px",
          borderRadius: "6px",
          border: "1px solid #333",
          background: "#1c1c1c",
          color: "white",
        }}
      />

      {/* Mensagem de erro */}
      {error && (
        <p style={{ color: "#ff4d4f", fontSize: "14px", margin: 0 }}>
          {error}
        </p>
      )}

      {/* Botão */}
      <button
        type="submit"
        style={{
          padding: "12px",
          border: "none",
          borderRadius: "6px",
          background: "#1DB954",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          marginTop: "5px",
        }}
      >
        {type === "login" ? "Entrar" : "Cadastrar"}
      </button>
    </form>
  );
}
