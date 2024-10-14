const CandidatoModel = require("../Models/Entidades/candidatoModel");
const DataBase = require('../Models/DataBase');

class CandidatoController {
    constructor() {
        this.candidatoModel = new CandidatoModel();
    }
    
    async obterTodos(req, res) {
        const sql = 'SELECT * FROM candidato';
        DataBase.executaComando(sql, (error, results) => {
            if (error) {
                console.error('Erro ao obter candidatos:', error);
                return res.status(500).json({ message: 'Erro ao obter candidatos', error: error.message });
            }
            res.status(200).json(results);
        });
    }
    
    async obterPorCpf(req, res) {
        const cpf = req.params.cpf;
        try {
            const candidato = await this.candidatoModel.obterPorCpf(cpf);
            return res.status(200).json(candidato);
        } catch (error) {
            console.error('Erro ao obter candidato por CPF:', error);
            return res.status(500).json({ message: 'Erro ao obter candidato', error: error.message });
        }
    }

    async adicionar(req, res) {
        const candidato = req.body;
        const sql = 'INSERT INTO candidato SET ?';
        
        DataBase.executaComando(sql, candidato, (error, results) => {
            if (error) {
                console.error('Erro ao adicionar candidato:', error);
                return res.status(500).json({ message: 'Erro ao adicionar candidato', error: error.message });
            }
            res.status(201).json({ id: results.insertId, ...candidato });
        });
    }

    async atualizar(req, res) {
        const cpfParam = req.params.cpf; 
        const { nome, dt_nasc, cep, endereco, numero, bairro, cidade, estado, telefone, email, estado_civil } = req.body;
        const candidato = new CandidatoModel(
            cpfParam, nome, dt_nasc, cep, endereco, numero, bairro, cidade, estado, telefone, email, estado_civil
        );
    
        try {
            await this.candidatoModel.atualizar(cpfParam, candidato); 
            return res.status(200).json({ message: 'Atualização com sucesso' }); 
        } catch (error) {
            console.error('Erro ao atualizar candidato:', error); 
            return res.status(500).json({ error: 'Erro ao atualizar candidato' });
        }
    }

    async excluir(req, res) {
        const cpfParam = req.params.cpf; 
    
        try {
            await this.candidatoModel.delete(cpfParam); 
            return res.status(200).json({ message: 'Item removido' });
        } catch (error) {
            console.error('Erro ao tentar excluir candidato:', error); 
            return res.status(500).json({ error: 'Erro ao tentar excluir candidato' });
        }
    }
  
    async filtrar(req, res) {
        const termoBusca = req.params.termoBusca;
        try {
            const candidatos = await this.candidatoModel.filtrar(termoBusca);
            return res.status(200).json(candidatos);
        } catch (error) {
            console.error('Erro ao filtrar candidatos:', error);
            return res.status(500).json({ message: 'Erro ao filtrar candidatos', error: error.message });
        }
    }
}

module.exports = CandidatoController;
