import '../../App.css';
import { Link, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import api from '../../services/api';

export const Cadastro = () => {

    let navigate = useNavigate();

    const [titulo, setTitulo] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Default dos dados e nao ficar mudando

        const data = { // Passando os dados que estão na model do add do backend
            "titulo": titulo,
            "ativo": false,
            "dataCadastro": "2023-05-22T01:30:24.5805304",
            "dataAlteracao": "2023-05-22T00:24:56.2500819",
            "userId": "6b196742-de2a-4679-8804-7e8c6c549705"
        };

        await api.post("/Add", data);
        alert("Mensagem criado com sucesso!");
        setTitulo("");
        navigate('/lista');

    };

    return (
        <div className='container' >
            <h1 className='titulo'>Cadastro</h1>

            <form onSubmit={handleSubmit}> {/* Quando tiver algum submit será chamado o handleSubmit pegando o que precisa e chamando a Api para salvar os dados */}
                <input className='input-text' type="text" value={titulo}
                    onChange={(e) => setTitulo(e.target.value)} placeholder='Digite aqui sua mensagem' /> {/* Toda vez que eu digitar algo ele vai atualizar o onChange passando para o {setTitulo}  */}

                <button className='btn-criar' type='submit'>
                    Enviar Mensagem
                </button>

                <Link className='btn-voltar' to="/lista">  {/* Redireciona para a página de listagem */}
                    Voltar
                </Link>

            </form>

        </div>

    );


}