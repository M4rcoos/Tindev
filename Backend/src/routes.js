//importando o express(aqui neste arquivo server irei ter todo o acesso a biblioteca do express)
const express = require("express");
const DevControllers = require("./controllers/DevControllers");
const LikeControllers = require("./controllers/LikeControllers");
const DislikesControllers = require("./controllers/DislikeController");

const routes = express.Router();

//acessando a rota, e quando eu acessarr a rota ele ira acessar o nosso "controller"
routes.get("/devs", DevControllers.index);
routes.post("/devs", DevControllers.store);

routes.post("/devs/:devId/likes", LikeControllers.store);
routes.post("/devs/:devId/dislikes", DislikesControllers.store);

//exportando a variavel
module.exports = routes;
