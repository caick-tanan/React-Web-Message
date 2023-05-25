
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react"; // Toda vez que a página for carregada será passado para dentro
import { Navigate } from "react-router-dom";
import api from '../services/api';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {  // Verifica se está logado, olhando o localStorage
        const loadData = () => {
            const storageUser = localStorage.getItem("@Context:user");
            const storageToken = localStorage.getItem("@Context:token");

            if (storageUser && storageToken) {
                setUser(storageUser); // confirma que o usuário está logado
            }
        };
        loadData(); // Carregando ou para tela de login ou para a listagem se estiver logado
    }, []);


    const signIn = async ({ email, senha }) => { // Responsável por logar o sistema
        try {
             // Chama a API e tentar criar o TokenIdentity
            const response = await api.post("/CriarTokenIdentity", { email: email, senha: senha, cpf: "" });
            // Caso de algum erro
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setUser(response.data);
                // Onde o Token fica salvo
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data}`;
                // Setando os dados no localStorage
                localStorage.setItem("@Context:user", JSON.stringify({ email: email, senha: "", cpf: "" }));
                localStorage.setItem("@Context:token", response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // Deslogando e limpando o localStorage
    const singOut = () => {
        localStorage.clear();
        setUser(null);
        return <Navigate to="/" />;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                singOut,
                signed: !!user, // Verifica se está logado
            }}>

            {children}
        </AuthContext.Provider>
    );


}