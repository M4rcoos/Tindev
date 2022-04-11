const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    //condição para verificar se o usuario existe (verificação busca pelo devId "ID do usuario")
    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    //COND.. verifica de o TargetDev ja tiver recebido LIKE do LoggedDev
    // aparecera uma mensagem de MATCH
    if (targetDev.likes.includes(loggedDev._id)) {
      console.log("DEU MATCH");
    }

    //acessando o DEV que esta logado na aplicação,pegando o Vetor de Likes adicionand o Id do desenvolveldor que recebeu o like no vetor likes
    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();
    return res.json(loggedDev);
  },
};
