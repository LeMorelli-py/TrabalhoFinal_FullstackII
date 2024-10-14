const VagaModel = require("../Models/Entidades/vagaModel");
const DataBase = require('../Models/DataBase'); // Certifique-se de que o caminho está correto

class VagaController {
    constructor() {
        this.vagaModel = new VagaModel();
    }

    async obterTodos(req, res) {
        const sql = 'SELECT * FROM vaga ORDER BY cargo';
        DataBase.executaComando(sql, (error, results) => {
            if (error) {
                console.error('Erro ao obter vagas:', error);
                return res.status(500).json({ message: 'Erro ao obter vagas', error: error.message });
            }
            res.status(200).json(results);
        });
    }

    async obterPorCod_Vaga(req, res) {
        const cod_Vaga = req.params.cod_Vaga;
        try {
            const vaga = await this.vagaModel.obterPorCod_Vaga(cod_Vaga);
            if (!vaga) {
                return res.status(404).json({ message: 'Vaga não encontrada' });
            }
            return res.status(200).json(vaga);
        } catch (error) {
            console.error('Erro ao obter a vaga:', error);
            return res.status(500).json({ message: 'Erro ao obter a vaga', error: error.message });
        }
    }

    async adicionar(req, res) {
        const vaga = req.body;
        const sql = 'INSERT INTO vaga SET ?';

        DataBase.executaComando(sql, vaga, (error, results) => {
            if (error) {
                console.error('Erro ao adicionar vaga:', error);
                return res.status(500).json({ message: 'Erro ao adicionar vaga', error: error.message });
            }
            res.status(201).json({ id: results.insertId, ...vaga });
        });
    }

    async atualizar(req, res) {
        const cod_VagaParam = req.params.cod_Vaga;
        const vaga = req.body;

        try {
            await this.vagaModel.atualizar(cod_VagaParam, vaga);
            return res.status(200).json({ message: 'Atualização com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar a vaga:', error);
            return res.status(500).json({ error: 'Erro ao atualizar a vaga' });
        }
    }

    async excluir(req, res) {
        const cod_VagaParam = req.params.cod_Vaga;

        try {
            await this.vagaModel.delete(cod_VagaParam);
            return res.status(200).json({ message: 'Vaga removida com sucesso!' });
        } catch (error) {
            console.error('Erro ao tentar excluir a vaga:', error);
            return res.status(500).json({ error: 'Erro ao tentar excluir a vaga' });
        }
    }

    async filtrar(req, res) {
        const termoBusca = req.params.termoBusca;
        try {
            const vagas = await this.vagaModel.filtrar(termoBusca);
            return res.status(200).json(vagas);
        } catch (error) {
            console.error('Erro ao filtrar as vagas:', error);
            return res.status(500).json({ message: 'Erro ao filtrar as vagas', error: error.message });
        }
    }
}

module.exports = VagaController;
