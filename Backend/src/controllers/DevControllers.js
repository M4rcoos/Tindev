//importando o axio (pacote para fazer requisições em API externas)
const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ],
    });
    return res.json(users);
  },

  //TODA VEZ QUE ULTILIZAR UM AWAIT DENTRO DA FUNÇÃO EU PRECISO FALAR QUE ESSA FUNÇÃO É ASSINCRONA
  // AWAIT é ultilizado para o Node esperar a execução para ir pra prxima linha

  async store(req, res) {
    // USANDO DESESTRUTURAÇÃO buscando "username" dentro do objeto req.body(irei obter a informação username )
    const { username } = req.body;

    //verificar se o Usuario ja existe no banco de dados buscando pelo(username)
    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    //resposta que o axios ira retornar

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({ name, user: username, bio, avatar });

    return res.json(dev);
  },
};
