import axios from "axios";

//criando uma configuração para informa para o Axios a Base Url da nossa API
const api = axios.create({
  baseURL: "http://localhost:3333",
});
export default api;
//oi
