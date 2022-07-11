import {Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import SurveyJS from "./SurveyJS";
import Hello from "./Hello";
import Login from "./Login"
import Page404 from "./Page404";
import Thanks from "./Thanks";
import FurtherQuestions from "./FurtherQuestions";
import CreateAccount from "./CreateAccount";
import Personal from "./Personal";
import ThanksEmail from "./ThanksEmail";
import {useState} from "react";

function App() {
    const [logged, setLogged] = useState("");
    const [ita, setIta] = useState(false);

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
            {
                logged!=="" ?
                    <h3 style={{ "position": "fixed", "top": 50, "left": 50}} > Hello, {logged} </h3>
                    : null
            }
        <Routes>
            <Route path='*' element={<Page404 ita={ita}/>} />
            <Route path='/' element={<Hello ita={ita} setIta={setIta} useNavigate={useNavigate}/>} />
            <Route path='/login' element={<Login doLogin={doLogin} ita={ita}/>} />
            <Route path='/survey' element={<SurveyJS ita={ita} logged={logged} doLogout={doLogout}/>} />
            <Route path='/thanks' element={<Thanks ita={ita} logged={logged} doLogout={doLogout}/>} />
            <Route path='/thanksEmail' element={<ThanksEmail ita={ita} logged={logged} doLogout={doLogout}/>} />
            <Route path='/furtherQuestions' element={<FurtherQuestions ita={ita}/>}/>
            <Route path='/createAccount' element={<CreateAccount doLogin={doLogin} ita={ita}/>}/>
            <Route path='/personal' element={<Personal ita={ita}/>}/>
        </Routes>
            {
                location.pathname!=="/" &&
                location.pathname!=="/login" &&
                location.pathname!=="/thanks" &&
                location.pathname!=="/furtherQuestions" ?
                <p style={{ "position": "fixed", "top": 50, "right": 50, "text-decoration": "underline"}} onClick={routeHome} >Home</p> :
                null
            }
        </>
    );
}


export default App
