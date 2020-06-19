const express = require("express");
const router = express.Router();

// Controller
const {
  renderPessoaForm,
  createNewPessoa,
  renderPessoa,
  renderEditForm,
  updatePessoa,
  deletePessoa
} = require("../controllers/pessoa.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Note
router.get("/pessoa/addPessoa", isAuthenticated, renderPessoaForm);

router.post("/pessoa/new-pessoa", isAuthenticated, createNewPessoa);

// Get All Notes
router.get("/pessoa", isAuthenticated, renderPessoa);

// Edit Notes
router.get("/pessoa/edit/:id", isAuthenticated, renderEditForm);

router.put("/pessoa/edit-pessoa/:id", isAuthenticated, updatePessoa);

// Delete Notes
router.delete("/pessoa/delete/:id", isAuthenticated, deletePessoa);

module.exports = router;
