import React, { useState } from "react";

import "./Login.css";
import api from "../services/api";
import logo from "../assets/logo.svg";

//criando um componente...exportando assim que for redenrizado...

export default function Login({ history }) {
  //criando uma variavel que ira receber o valor dos imput..
  //useState começa com um valor vazio... setUsername altera o valor vazio
  const [username, setUsername] = useState("");

  // criando a função que ira disparar nosso Submit
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/devs", {
      username,
    });

    const { _id } = response.data;
    history.push(`/dev/${_id}`);
  }

  return (
    //onSubmit recebe a funçao handleSubmit
    //input vai receber o username
    //setUsername recebe o valor digitado  no imput e seta no estado
    //onChange é um evento do imput, quando ele mudar ele ira fazer oque eu estou declarando para ele

    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuario do Github"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
