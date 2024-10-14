const DataBase = require("../DataBase");

class VagaModel {
    constructor(cod_vaga, cargo, salario, cidade, estado, qtde_vaga) {
        this.cod_vaga = cod_vaga;
        this.cargo = cargo;
        this.salario = salario;
        this.cidade = cidade;
        this.estado = estado;
        this.qtde_vaga = qtde_vaga;
    }

    async obterTodos() {
        const listaVaga = await DataBase.ExecutaComando(
            "SELECT * FROM vaga ORDER BY cargo;"
        );
        return listaVaga;
    }

    async obterPorCod_Vaga(cod_Vaga) {
        const result = await DataBase.ExecutaComando(
            "SELECT * FROM vaga WHERE cod_vaga = ?",
            [cod_Vaga]
        );
        return result[0];
    }

    async adicionar(dadosVaga) {
        console.log("dadosVaga:", dadosVaga);
        await DataBase.ExecutaComandoNonQuery(
            "INSERT INTO vaga SET ?",
            dadosVaga
        );
    }

    async atualizar(cod_Vaga, dadosVaga) {
        await DataBase.ExecutaComandoNonQuery(
            "UPDATE vaga SET ? WHERE cod_vaga = ?",
            [dadosVaga, cod_Vaga]
        );
    }

    async delete(cod_Vaga) {
        await DataBase.ExecutaComandoNonQuery(
            "DELETE FROM vaga WHERE cod_vaga = ?",
            [cod_Vaga]
        );
    }

    async filtrar(termoBusca) {
        const vagas = await DataBase.ExecutaComando(
            "SELECT * FROM vaga WHERE cargo LIKE ?",
            [`%${termoBusca}%`]
        );
        return vagas;
    }
}

module.exports = VagaModel;
