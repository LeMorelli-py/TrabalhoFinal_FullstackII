const bcryptjs =require('bcryptjs')
const jwt = require('jsonwebtoken');
const userModel = require('../model/entidades/userModel.js')


const registerUser =async (nome, email, senha)=>{

    const userExists= await userModel.findUserByEmail(email);
    if (userExists){
        throw new Error('já existe usuário neste e-mail')
    }

    const hashedSenha =await bcryptjs.hash(senha, 10)
    await userModel.createUser(nome, email, hashedSenha)
}

const loginUser = async (email) => {
    try {
      const user = await userModel.findUserByEmail(email);
  
      if (!user) {
        throw new Error('Usuário ou senha inválidos!');
      }
    
      const token = jwt.sign({ id: user.id_usuario, nome: user.nome, email: user.email }, process.env.JWT_SECRET);
      return token;
    } catch (error) {
      throw error;
    }
  };

module.exports={
    registerUser,
    loginUser
}

