const jwt = require('jsonwebtoken'); 
function assinar(usuario) {
    const token = jwt.sign({ usuario }, process.env.CHAVE_SECRETA, { expiresIn: '1d' });
    return token;
}

function verificarAssinatura(token) {
    try {
        const decoded = jwt.verify(token, process.env.CHAVE_SECRETA);
        return decoded;
    } catch (error) {
        throw new Error('Token inválido ou expirado');
    }
}

// Exportação das funções
module.exports = {
    assinar,
    verificarAssinatura,
};