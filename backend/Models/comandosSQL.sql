CREATE TABLE candidato (
    cpf VARCHAR(11) NOT NULL PRIMARY KEY UNIQUE,
    nome VARCHAR(100) NOT NULL,
    dt_nasc DATE NOT NULL,
    cep VARCHAR(9),
    endereco VARCHAR(100),
    numero INT NOT NULL,
    bairro VARCHAR(30),
    cidade VARCHAR(25),
    estado CHAR(2),
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    estado_civil ENUM('Solteiro', 'Casado', 'Separado', 'Divorciado', 'Viúvo') NOT NULL
);

CREATE TABLE vaga (
    cod_vaga INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    salario DECIMAL(10, 2) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado CHAR(2) NOT NULL,
    qtde_vaga INT NOT NULL CHECK (qtde_vaga > 0)
);

CREATE TABLE inscricao (
    id_inscricao INT AUTO_INCREMENT PRIMARY KEY,
    data_inscricao DATE NOT NULL,
    hora_inscricao TIME NOT NULL,
    pk_cand_cpf VARCHAR(11),
    pk_cod_vaga INT,
    status_inscricao ENUM('Pendende', 'Aprovado', 'Rejeitado') NOT NULL,
    FOREIGN KEY (pk_cand_cpf) REFERENCES candidato(cpf) ON DELETE CASCADE,
    FOREIGN KEY (pk_cod_vaga) REFERENCES vaga(cod_vaga) ON DELETE CASCADE,
    UNIQUE (pk_cand_cpf, pk_cod_vaga)
);

