const { assinar, verificarAssinatura } = require('../middleware/funcoesJWT');

function login(req, resp) {
    const { usuario, senha } = req.body; // Desestruturação para maior clareza

    if (usuario === 'admin' && senha === 'admin') {
        req.session.usuario = usuario; // Armazenar o usuário na sessão
        resp.status(200).json({
            status: true,
            mensagem: 'Login efetuado com sucesso!',
            token: assinar(usuario) // Gerar o token
        });
    } else {
        resp.status(401).json({
            status: false,
            mensagem: 'Usuário ou senha inválidas'
        });
    }
}

function logout(req, resp) {
    req.session.destroy(err => {
        if (err) {
            return resp.status(500).json({
                status: false,
                mensagem: 'Erro ao encerrar a sessão'
            });
        }
        resp.status(200).json({ status: true });
    });
}

function verificarAutenticacao(req, resp, next) {
    const token = req.headers['authorization'];
    
    if (token) {
        const tokenVerificado = verificarAssinatura(token); // Verificar o token

        if (tokenVerificado && tokenVerificado.usuario === req.session.usuario) {
            return next(); // Prosseguir se a verificação for bem-sucedida
        } else {
            resp.status(401).json({
                status: false,
                mensagem: 'Não autorizado!'
            });
        }
    } else {
        resp.status(401).json({
            status: false,
            mensagem: 'Acesso Negado! Faça login para continuar'
        });
    }
}

// Exportação das funções
module.exports = {
    login,
    logout,
    verificarAutenticacao
};