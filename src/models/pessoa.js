const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const PessoaSchema = new Schema(
  {
    nome: {
      type: String,
      //required: 'This field is required.'
      required: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'É necessário um endereço de e-mail',
      validate: [validateEmail, 'Por favor, preencha um endereço de email válido'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, preencha um endereço de email válido']
    },
    telefone: {
        type: String,
        required: [ "phone" ]
    },
    cidade: {
        type: String,
        required: [ "city" ]
    },
    user: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Pessoa", PessoaSchema);
