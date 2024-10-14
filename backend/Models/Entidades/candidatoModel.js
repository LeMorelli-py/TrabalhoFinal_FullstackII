// backend/Models/Entidades/candidatoModel.js
const DataBase = require('../DataBase'); // Certifique-se de que o caminho está correto

class CandidatoModel {
    constructor(cpf, nome, dt_nasc, cep, endereco, numero, bairro, cidade, estado, telefone, email, estado_civil) {
        this.cpf = cpf;
        this.nome = nome;
        this.dt_nasc = dt_nasc;
        this.cep = cep;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.telefone = telefone;
        this.email = email;
        this.estado_civil = estado_civil;
    }

    static async obterTodos() {
        const sql = 'SELECT * FROM candidato';
        return new Promise((resolve, reject) => {
            DataBase.executaComando(sql, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static async obterPorCpf(cpf) {
        const sql = 'SELECT * FROM candidato WHERE cpf = ?';
        return new Promise((resolve, reject) => {
            DataBase.executaComando(sql, [cpf], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    }

    async adicionar() {
        const sql = 'INSERT INTO candidato SET ?';
        return new Promise((resolve, reject) => {
            DataBase.executaComando(sql, this, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    }

    static async atualizar(cpf, candidato) {
        const sql = 'UPDATE candidato SET ? WHERE cpf = ?';
        return new Promise((resolve, reject) => {
            DataBase.executaComando(sql, [candidato, cpf], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static async delete(cpf) {
        const sql = 'DELETE FROM candidato WHERE cpf = ?';
        return new Promise((resolve, reject) => {
            DataBase.executaComando(sql, [cpf], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
}

module.exports = CandidatoModel;