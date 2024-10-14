const InscricaoModel = require("../Models/Entidades/inscricaoModel");
const DataBase = require('../Models/DataBase'); // Certifique-se de que o caminho está correto

class InscricaoController {
    constructor() {
        this.inscricaoModel = new InscricaoModel();
    }
    
    obterTodos(req, res) {
        const sql = 'SELECT * FROM inscricao';
        DataBase.executaComando(sql, (error, results) => {
            if (error) {
                console.error('Erro ao buscar inscrições:', error);
                return res.status(500).send('Erro ao buscar inscrições');
            }
            res.json(results);
        });
    }
    
    async obterPorId(req, res) {
        const id_inscricao = req.params.id_inscricao;
        const inscricao = await this.inscricaoModel.obterPorId(id_inscricao);
        return res.status(200).json(inscricao);
    }

    async adicionar(req, res) {
        const inscricao = req.body;
        const sql = 'INSERT INTO inscricao SET ?';
        
        DataBase.executaComando(sql, inscricao, (error, results) => {
            if (error) {
                console.error('Erro ao adicionar inscrição:', error);
                return res.status(500).json({ message: 'Erro ao adicionar inscrição', error: error.message });
            }
            res.status(201).json({ id: results.insertId, ...inscricao });
        });
    }

    async atualizar(req, res) {
        const idParam = req.params.id_inscricao;
        const { data_inscricao, hora_inscricao, pk_cand_cpf, pk_cod_vaga, status_inscricao } = req.body;
        const inscricao = new InscricaoModel(idParam, data_inscricao, hora_inscricao, pk_cand_cpf, pk_cod_vaga, status_inscricao);
    
        try {
            await this.inscricaoModel.atualizar(idParam, inscricao);
            return res.status(200).json({ message: 'Atualização com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar inscrição:', error);
            return res.status(500).json({ error: 'Erro ao atualizar inscrição' });
        }
    }

    async excluir(req, res) {
        const idParam = req.params.id_inscricao;
    
        try {
            await this.inscricaoModel.delete(idParam);
            return res.status(200).json({ message: 'Inscrição removida' });
        } catch (error) {
            console.error('Erro ao tentar excluir inscrição:', error);
            return res.status(500).json({ error: 'Erro ao tentar excluir inscrição' });
        }
    }
  
    async filtrar(req, res) {
        const termoBusca = req.params.termoBusca;
        const inscricoes = await this.inscricaoModel.filtrar(termoBusca);
        return res.status(200).json(inscricoes);
    }

    async obterPorIdInscricao(req, res) {
        const { id } = req.params;
        try {
            const inscricao = await this.inscricaoModel.obterPorId(id);
            if (!inscricao) {
                return res.status(404).json({ message: 'Inscrição não encontrada' });
            }
            return res.status(200).json(inscricao);
        } catch (error) {
            console.error('Erro ao obter inscrição:', error);
            return res.status(500).json({ message: 'Erro ao obter inscrição', error: error.message });
        }
    }
}

module.exports = InscricaoController;
