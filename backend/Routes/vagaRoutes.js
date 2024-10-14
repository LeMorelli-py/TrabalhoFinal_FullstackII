const VagasController = require('../Controller/vagaController')

const vagasController = new VagasController();
const express =require('express');
const router =express.Router();

router.get('/',vagasController.obterTodos)
router.get('/:cod_vaga',vagasController.obterPorCod_Vaga)
router.post('/',vagasController.adicionar)
router.put('/:cod_vaga',vagasController.atualizar)
router.delete('/:cod_vaga',vagasController.excluir)
router.get('/filtrar/:termoBusca',vagasController.filtrar)

module.exports=router;