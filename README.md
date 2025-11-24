🎵 React Playlists App
Sistema Web de Músicas e Playlists · React + TypeScript + Router + Yarn










📘 Sobre o Projeto

Este é um sistema web construído em React + TypeScript, com autenticação simples, gerenciamento de músicas, gerenciamento de playlists e visualização de detalhes de qualquer playlist.

O sistema utiliza:

React Router DOM para navegação

LocalStorage como mecanismo simples de autenticação

Componentes reutilizáveis

Yarn como gerenciador de pacotes

O projeto contém páginas como login, listagem de músicas, listagem de playlists e visualização individual de cada playlist.

🚀 Tecnologias Utilizadas

⚛️ React 18

🟦 TypeScript

📦 Yarn

🌐 React Router DOM v6

💾 LocalStorage – método simples para autenticação

📂 Estrutura do Projeto
src/
 ├── components/
 │    └── PrivateRoute.tsx
 ├── pages/
 │    ├── LoginPage.tsx
 │    ├── HomePage.tsx
 │    ├── MusicasPage.tsx
 │    ├── PlaylistsPage.tsx
 │    └── PlaylistDetailPage.tsx
 ├── App.tsx
 ├── main.tsx / index.tsx
 └── services/
      └── api.ts (opcional)

🔐 Rotas do Sistema
🔓 Pública
Rota	Página	Descrição
/login	LoginPage	Página de login
🔒 Protegidas
Rota	Página	Descrição
/home	HomePage	Tela inicial
/musicas	MusicasPage	Lista de músicas
/playlists	PlaylistsPage	Lista de playlists
/playlist/:id	PlaylistDetailPage	Detalhes da playlist

A proteção é feita pelo componente PrivateRoute, que verifica se o token está no localStorage.

▶️ Como Rodar o Projeto
1. Instale as dependências
yarn install

2. ...
npm install -g yarn

3. ...
npm install react-dom

4. Rodar o código
yarn dev

🔑 Autenticação

O login salva um token simples:

localStorage.setItem("token", "seu_token");


Para logout:

localStorage.removeItem("token");


E o PrivateRoute impede acesso caso o token não exista.

🎵 Funcionalidades
✔️ Login

Sistema simples de autenticação com redirecionamento automático.

✔️ Página de Músicas

Lista músicas cadastradas.

✔️ Página de Playlists

Lista playlists criadas e permite acessar detalhes.

✔️ Detalhes da Playlist

Permite visualizar músicas pertencentes a uma playlist específica.

🐞 Problema Conhecido: 
Atualizar Página Remove Playlists. Ao atualizar a página (F5) em /playlists, as playlists somem;
CRUD não funcional;

Problemas Corrigidos: 
Enviado via gitHub;
melhor estrutura das rotas;
LocalStorege agora funcionando no Login;



