import {Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import SurveyJS from "./SurveyJS";
import Hello from "./Hello";
import Login from "./Login"
import Page404 from "./Page404";
import Thanks from "./Thanks";
import "./App.css"
import {useState} from "react";

function App() {
    const [logged, setLogged] = useState("");

    const location = useLocation();
    let navigate = useNavigate();
    const doLogin = (email) => {setLogged(email);}
    const doLogout = () => {setLogged("");}
    const routeHome = () => {
        doLogout();
        navigate("/");
    }

    return (
        <>
        <Routes>
            <Route path='*' element={<Page404/>} />
            <Route path='/' element={<Hello useNavigate={useNavigate}/>} />
            <Route path='/login' element={<Login doLogin={doLogin}/>} />
            <Route path='/survey' element={<SurveyJS logged={logged}/>} />
            <Route path='/thanks' element={<Thanks doLogout={doLogout}/>} />
        </Routes>
            {
                location.pathname!=="/" && location.pathname!=="/login" && location.pathname!=="/thanks" ?
                <button className="btn btn-md btn-secondary" type="button" style={{ "position": "fixed", "bottom": 50, "right": 50}} onClick={routeHome}>Home</button> :
                null
            }
        </>
    );
}


export default App
