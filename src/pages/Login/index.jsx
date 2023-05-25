// instalação npm install eslint-plugin-react-hooks --save-dev

import '../../App.css';


import { useState, useEffect, useContext } from 'react';

import { Navigate, Outlet, Redirect } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";




export const Login = () => {

    let navigate = useNavigate();
 
    const { signIn, signed } = useContext(AuthContext); // Criando o contexto

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!email || !senha) { 
            alert("Digite email e senha ")
            return;
        }

        const data = { // Passando os dados que estão na model do add do backend
            email,
            senha,
        };
        await signIn(data); // Chama o método de Login
    };

    if (!signed) { // Caso não esteja logado 

        return (

            <div className='container'>

                <form onSubmit={handleSubmit} > {/* Quando tiver algum submit será chamado o handleSubmit pegando o que precisa e chamando a Api para salvar os dados */}
                    <div className="container-login">
                        <h1>Login</h1>
                        <input className='input-text'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder='E-mail'/> {/* Toda vez que eu digitar algo ele vai atualizar o onChange passando para o {setTitulo}  */}

                        <input className='input-text'
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} placeholder='Senha' />

                        <button className='btn-criar' type="submit" >
                            Acessar
                        </button>
                    </div>

                </form>
            </div>

        );
    }
    else {
        return <Navigate to="/lista" />; // Caso esteja logado com tudo certo será direcionado para a lista
    }
};