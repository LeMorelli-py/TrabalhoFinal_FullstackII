const CandidatoController = require('../Controller/candidatoController');
const express = require('express');
const router = express.Router();

const candidatosController = new CandidatoController();

router.get('/', candidatosController.obterTodos.bind(candidatosController))
router.post('/', candidatosController.adicionar.bind(candidatosController))
router.get('/filtrar/:termoBusca', candidatosController.filtrar.bind(candidatosController))
router.get('/:cpf', candidatosController.obterPorCpf.bind(candidatosController))
router.patch('/:cpf', candidatosController.atualizar.bind(candidatosController))
router.put('/:cpf', candidatosController.atualizar.bind(candidatosController))
router.delete('/:cpf', candidatosController.excluir.bind(candidatosController))

module.exports = router;
