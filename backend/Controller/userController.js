const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuario = require('../Models/Entidades/userModel.js');

const userController = {
    // Cria um usuário
    createUser: async (req, res) => {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
        }

        // Verifica se o email já está cadastrado
        const existingUser = await usuario.findByEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        const hashedSenha = bcrypt.hashSync(senha, 10);

        try {
            const result = await usuario.create(nome, email, hashedSenha);
            return res.status(201).json({ message: 'Usuário criado com sucesso', result });
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
        }
    },
    
    // Realiza o login do usuário
    login: async (req, res) => {
        const { nome, senha } = req.body;

        if (!nome || !senha) {
            return res.status(400).json({ message: 'Nome e senha são obrigatórios.' });
        }

        try {
            const results = await usuario.findByUsername(nome);
            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const usuarioEncontrado = results[0];

            if (bcrypt.compareSync(senha, usuarioEncontrado.senha)) {
                const token = jwt.sign({ id: usuarioEncontrado.id_usuario }, process.env.JWT_SECRET || 'minhachavesecreta', { expiresIn: '1h' });
                return res.json({ token });
            } else {
                return res.status(401).json({ message: 'Senha incorreta' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
        }
    },

    // Realiza o logout do usuário
    logout: async (req, res) => {
        return res.json({ message: 'Logout realizado com sucesso' });
    },

    // Retorna todos os usuários
    getAllUsers: async (req, res) => {
        try {
            const results = await usuario.findAll();
            return res.json(results.length ? results : []); // Retorna um array vazio se não houver usuários
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar usuários', error: err.message });
        }
    },

    // Atualiza um usuário
    updateUser: async (req, res) => {
        const { id_usuario, nome, email, senha } = req.body;

        if (!id_usuario || !nome || !email) {
            return res.status(400).json({ message: 'ID do usuário, nome e email são obrigatórios.' });
        }

        try {
            const usuarioExistente = await usuario.findById(id_usuario);
            if (!usuarioExistente.length) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const hashedSenha = senha ? bcrypt.hashSync(senha, 10) : undefined; // Hash senha se fornecida
            const result = await usuario.update(id_usuario, nome, email, hashedSenha);
            return res.json({ message: 'Usuário atualizado com sucesso', result });
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao atualizar usuário', error: err.message });
        }
    },

    // Busca um usuário pelo Nome
    getUserByName: async (req, res) => {
        const { nome } = req.params;

        if (!nome) {  
            return res.status(400).json({ message: 'Nome do usuário é obrigatório.' });
        }

        try {
            const results = await usuario.findByUsername(nome);
            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            return res.json(results);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
        }
    },

    // Busca um usuário pelo ID
    getUserById: async (req, res) => {
        const { id_usuario } = req.params;
    
        if (!id_usuario) {
            return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
        }
    
        try {
            const results = await usuario.findById(id_usuario);
            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            return res.json(results);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
        }
    },

    // Deleta um usuário
    deleteUser: async (req, res) => {
        const { id_usuario } = req.params;
    
        if (!id_usuario) {
            return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
        }
    
        try {
            const result = await usuario.delete(id_usuario);
            if (result.affectedRows === 0) { // Verifica se algum usuário foi deletado
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            return res.json({ message: 'Usuário excluído com sucesso', result });
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao excluir usuário', error: err.message });
        }
    }   
}

module.exports = userController;