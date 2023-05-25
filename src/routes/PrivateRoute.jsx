import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";

export const PrivateRoute = () => {
    const { signed } = useContext(AuthContext);
    return signed ? <Outlet /> : <Navigate to="/" />; // Caso esteja logado permite o acesso se não será redirecionado para a tela de Login
};