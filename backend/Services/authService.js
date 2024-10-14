const jwt = require('jsonwebtoken');

const authService = {
    verifyToken: (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) return res.status(403).json({ message: 'Token não fornecido' });

        jwt.verify(token, 'minhachavesecreta', (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Token inválido' });
            req.userId = decoded.id;
            req.accessLevel = decoded.level;
            next();
        });
    }
};

module.exports = authService;