//importando o express(aqui neste arquivo server irei ter todo o acesso a biblioteca do express)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//importando Rotas do arquivo routes
const routes = require("./routes");
//criando o servidor... e chamando a função express()
const server = express();

//Se conectando com o banco de dados...
mongoose.connect(
  "mongodb+srv://tinderDev:tinderDev@cluster0.t8sib.mongodb.net/tinderDev?retryWrites=true&w=majority",
  {
    //informando para o moongose que pode aceitar os novos formatos de URL
    useNewUrlParser: true,
  }
);

server.use(cors());
//Informando para o express que irei ter requisição Json
server.use(express.json());

server.use(routes);
//Porta que meu servidor ira "Ouvir"
server.listen(3333);
