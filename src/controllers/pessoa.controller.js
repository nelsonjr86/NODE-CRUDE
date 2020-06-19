const pessoaCtrl = {};

// Models
const Pessoa = require("../models/pessoa");

pessoaCtrl.renderPessoaForm = (req, res) => {
  res.render("pessoa/new-pessoa");
};

pessoaCtrl.createNewPessoa = async (req, res) => {
  const { nome, email, telefone, cidade } = req.body;
  const errors = [];
  if (!nome) {
    errors.push({ text: "Por favor, escreva um Nome." });
  }
  if (!email) {
    errors.push({ text: "Por favor, escreva email." });
  }
  if (!telefone) {
    errors.push({ text: "Por favor, escreva o telefone." });
  }
  if (!cidade) {
    errors.push({ text: "Por favor, escreva a Cidade" });
  }
  if (errors.length > 0) {
    res.render("pessoa/new-pessoa", {
      errors,
      nome,
      email,
      telefone,
      cidade
    });
  } else {
    const newPessoa = new Pessoa({ nome, email, telefone, cidade });
    newPessoa.user = req.user.id;
    await newPessoa.save();
    req.flash("success_msg", "Pessoa adicionada com sucesso");
    res.redirect("/pessoa");
  }
};

pessoaCtrl.renderPessoa = async (req, res) => {
  //const pessoa = await Pessoa.find({ user: req.user.id }).sort({ date: "desc" });
  const pessoa = await Pessoa.find().sort({ date: "desc" });
  res.render("pessoa/all-pessoa", { pessoa });
};

pessoaCtrl.renderEditForm = async (req, res) => {
  const pessoa = await Pessoa.findById(req.params.id);
//  if (pessoa.user != req.user.id) {
//    req.flash("error_msg", "Not Authorized");
//    return res.redirect("/pessoa");
//  }
  res.render("pessoa/edit-pessoa", { pessoa });
};

pessoaCtrl.updatePessoa = async (req, res) => {
  const { nome, email, telefone, cidade, user } = req.body;
  await Pessoa.findByIdAndUpdate(req.params.id, { nome, email, telefone, cidade, user:req.user.id });
  req.flash("success_msg", "Pessoa atualizada com sucesso");
  res.redirect("/pessoa");
};

pessoaCtrl.deletePessoa = async (req, res) => {
  await Pessoa.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Pessoa excluída com sucesso");
  res.redirect("/pessoa");
};

module.exports = pessoaCtrl;
