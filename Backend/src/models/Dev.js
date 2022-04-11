const { Schema, model } = require("mongoose");

//criando a estrutura do meu banco de dados, para amarzena um desenvolveldor la dentro
const DevSchema = new Schema(
  {
    //nosso usuario ira ter um NOME do tipo String e Ira ser OBRIGATORIO! ==> (REQUIRED:TRUE)
    name: {
      type: String,
      required: true,
    },
    //nosso DEV ira ter um User do GITHUB...[]
    user: {
      type: String,
      required: true,
    },
    bio: String,
    avatar: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev",
      },
    ],
  },
  {
    //. Se você definir timestamps: true, o Mongoose adicionará duas propriedades de tipo Date ao seu esquema:
    // createdAt: uma data que representa quando este documento foi criado
    //updatedAt: uma data que representa quando este documento foi atualizado pela última vez

    timestamps: true,
  }
);

module.exports = model("DEV", DevSchema);
