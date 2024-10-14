const InscricaoController = require('../Controller/inscricaoController');
const express = require('express');
const router = express.Router();

const inscricoesController = new InscricaoController();

// Middleware de validação de ID
const validarId = (req, res, next) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    next();
};

router.get('/', inscricoesController.obterTodos.bind(inscricoesController));
router.get('/:id', validarId, inscricoesController.obterPorIdInscricao.bind(inscricoesController));
router.post('/', inscricoesController.adicionar.bind(inscricoesController));
router.put('/:id', validarId, inscricoesController.atualizar.bind(inscricoesController));
router.delete('/:id', validarId, inscricoesController.excluir.bind(inscricoesController));
router.get('/filtrar/:termoBusca', inscricoesController.filtrar.bind(inscricoesController));

module.exports = router;
