import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Lista} from "../pages/List"
import { Edicao } from "../pages/Edicao";
import { Delete } from "../pages/Delete";
import { Cadastro } from "../pages/Cadastro";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Será a primeira pagina listada */}

                <Route path="/Cadastro" element={<PrivateRoute />} > {/* Faz o bloqueio das rotas por meio do navegador */} 
                    <Route path="/Cadastro" element={<Cadastro />} />
                </Route>

                <Route path="/lista" element={<PrivateRoute />}>
                    <Route path="/lista" element={<Lista />} />
                </Route>

                <Route path="/edicao/:id" element={<PrivateRoute />}>
                    <Route path="/edicao/:id" element={<Edicao />} /> {/* passando para edição o id da mensagem */}
                </Route>


                <Route path="/delete/:id" element={<PrivateRoute />}>
                    <Route path="/delete/:id" element={<Delete />} /> {/* passando para edição o id da mensagem */}
                </Route>

            </Routes>
        </Router>
    );
}