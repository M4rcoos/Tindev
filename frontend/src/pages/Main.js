import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";

import logo from "../assets/logo.svg";
import dislike from "../assets/dislike.svg";
import like from "../assets/like.svg";

import { Link } from "react-router-dom";
import "./Main.css";

function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUser() {
      const response = await api.get("/devs", {
        headers: { user: match.params.id },
      });
      setUsers(response.data);
    }

    loadUser();
  }, [match.params.id]);

  //criando a função de dislike, buscando usuario Na API pelo user e ID
  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    });

    //chamando a função setUsers,fazendo um filtro dos usuarios que tenha o id diferente, removendo o usuario com o id chamado na função dislike
    //user é a variavel que cria a lista de informações do usuario!
    setUsers(users.filter((user) => user._id !== id));
  }
  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id },
    });

    //chamando a função setUsers,fazendo um filtro dos usuarios que tenha o id diferente, removendo o usuario com o id chamado na função dislike
    //user é a variavel que cria a lista de informações do usuario!
    setUsers(users.filter((user) => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {/* criando uma condição com IF TENARIO para verificar o tamanho da lista...*/}
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty"> Acabou :( </div>
      )}
    </div>
  );
}

export default Main;
