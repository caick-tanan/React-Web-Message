import '../../App.css';
import { Link, useNavigate, useParams } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import api from '../../services/api';

export const Edicao = () => {

    let navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [mensagem, setMensagem] = useState({});

    const { id } = useParams();


    useEffect(() => {

        const param = {
            "id": id,
            "titulo": titulo,
            "ativo": false,
            "dataCadastro": "2023-05-22T01:30:24.5805304",
            "dataAlteracao": "2023-05-22T00:24:56.2500819",
            "userId": "6b196742-de2a-4679-8804-7e8c6c549705"
        };

        api.post('GetEntityById', param).then(({ data }) => {
            setMensagem(data);
            setTitulo(data.titulo);
        })
    },{})

 
    const handleSubmit = async (e) => { 
        e.preventDefault(); // Default dos dados e nao ficar mudando

        const data = { // Passando os dados que estão na model do add do backend
            "id":mensagem.id,
            "titulo": titulo,
            "ativo": mensagem.ativo,
            "dataCadastro": mensagem.dataCadastro,
            "dataAlteracao": mensagem.dataAlteracao,
            "userId": mensagem.userId
        };

        await api.post("/Update", data);
        alert("Alterado com sucesso!");
        setTitulo("");
        navigate('/lista');

    };

    return (
        <div className='container' >
            <h1 className='titulo'>Edição</h1>

            <form onSubmit={handleSubmit}> {/* Quando tiver algum submit será chamado o handleSubmit pegando o que precisa e chamando a Api para salvar os dados */}
                <input className='input-text' type="text" value={titulo}
                    onChange={(e) => setTitulo(e.target.value)} /> {/* Toda vez que eu digitar algo ele vai atualizar o onChange passando para o {setTitulo}  */}

                <button className='btn-criar' type='submit'>
                    Salvar Edição
                </button>

                <Link className='btn-voltar' to="/lista"> {/* Redireciona para a página de listagem */}
                    Voltar
                </Link>

            </form>

        </div>

    );


}