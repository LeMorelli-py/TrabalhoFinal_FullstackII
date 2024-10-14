const DataBase = require("../DataBase");

class InscricaoModel {
    constructor(id_inscricao, data_inscricao, hora_inscricao, pk_cand_cpf, pk_cod_vaga, status_inscricao) {
        this.id_inscricao = id_inscricao;
        this.data_inscricao = data_inscricao;
        this.hora_inscricao = hora_inscricao;
        this.pk_cand_cpf = pk_cand_cpf;
        this.pk_cod_vaga = pk_cod_vaga;
        this.status_inscricao = status_inscricao;
    }

    async obterTodos() {
        const listaInscricao = await DataBase.ExecutaComando(
            "SELECT * FROM inscricao ORDER BY id_inscricao;"
        );
        return listaInscricao;
    }

    async adicionar(dadosInscricao) {
        await DataBase.ExecutaComandoNonQuery(
            "INSERT INTO inscricao SET ?",
            dadosInscricao
        );
    }

    async atualizar(id_inscricao, dadosInscricao) {
        await DataBase.ExecutaComandoNonQuery(
            "UPDATE inscricao SET ? WHERE id_inscricao = ?",
            [dadosInscricao, id_inscricao]
        );
    }

    async delete(id_inscricao) {
        await DataBase.ExecutaComandoNonQuery(
            "DELETE FROM inscricao WHERE id_inscricao = ?",
            [id_inscricao]
        );
    }

    async filtrar(termoBusca) {
        const inscricao = await DataBase.ExecutaComando(
            "SELECT * FROM inscricao WHERE status_inscricao LIKE ?",
            [`%${termoBusca}%`]
        );
        return inscricao;
    }
}

module.exports = InscricaoModel;
