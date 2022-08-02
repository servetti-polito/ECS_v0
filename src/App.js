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
import {useState, useContext, useEffect} from "react";
import {AccountContext} from "./Account";
import Page401 from "./Page401";
import ProtectedRoute from "./ProtectedRoute";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import Dashboard from "./Dashboard";
import jwtGenerator from "./jwtGenerator";

Amplify.configure(config);

function App() {
    const [adminLogged, setAdminLogged] = useState(false);
    const [logged, setLogged] = useState("");
    const [userJwt, setUserJwt] = useState(null);
    const [deviceJwt, setDeviceJwt] = useState(null);
    const [ita, setIta] = useState(false);
    const [answers, setAnswers] = useState(null);
    const [anon, setAnon] = useState(null);

    const {authenticate} = useContext(AccountContext);

    const location = useLocation();
    let navigate = useNavigate();
    const doLogin = (email, token) => {
        console.log("DO LOGIN: "+email+" "+token)
        setUserJwt(jwtGenerator(token));
        setLogged(email);
    }
    const doLogout = () => {
        setLogged("");
        setUserJwt(null);
        setAnswers(null);
    }
    const routeHome = () => {
        doLogout();
        navigate("/");
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get("multi")!=null) //?user=admin&pass=admin2022&multi=5
    {
        localStorage.setItem("loading", true);
        localStorage.setItem("multi", urlParams.get("multi"));
        //if user or password are missing, the auth will fail by itself
        authenticate(urlParams.get("user"), urlParams.get("pass")).then(()=>{
            console.log("Logged in");
            setAdminLogged(true);
            routeHome()
            localStorage.setItem("loading", false);
        }).catch((err)=>console.log(err))
    }

    const {getSession} = useContext(AccountContext);
    useEffect(()=>{
        getSession().then(session=>{
            setAdminLogged(true);
            //localStorage.setItem("appJwt", session.getAccessToken().getJwtToken())
            localStorage.setItem("appJwt", session.getIdToken().getJwtToken())
            setDeviceJwt(localStorage.getItem("appJwt"))
        }).catch(setAdminLogged(false))
    }, [window.location.href])

    setInterval(()=>{
        if(userJwt!==null && userJwt.exp < Date.now()/1000)
            setUserJwt(null)
    }, 1000)

    return (
        <>
            {
                /*logged!=="" ?
                    <div className="row">
                        <div className="col-10">
                            <h5 style={{display: "inline-block", padding: "10px"}}>Hello, {logged}</h5>
                        </div>
                        <div className="col-2">
                            <p onClick={doLogout} style={{display: "inline-block", textDecoration: "underline"}}> Log out</p>
                        </div>
                    </div>
                    : null*/
            }
            <Routes>
                <Route path='*' element={<Page404 ita={ita}/>} />
                <Route exact path="/page401" element={<Page401/>}/>
                <Route exact path='/' element={<ProtectedRoute logged={adminLogged} />}>
                    <Route exact path='/' element={<Hello doLogout={doLogout} logged={logged} ita={ita} setIta={setIta} useNavigate={useNavigate}/>}/>
                </Route>
                <Route exact path='/login' element={<ProtectedRoute logged={adminLogged}/>}>
                    <Route path='/login' element={<Login deviceJwt={deviceJwt} setUserJwt={setUserJwt} doLogin={doLogin} ita={ita}/>} />
                </Route>
                <Route exact path='/survey' element={<ProtectedRoute logged={adminLogged}/>}>
                    <Route path='/survey' element={<SurveyJS setAnon={setAnon} setAnswers={setAnswers} ita={ita} logged={logged} doLogout={doLogout}/>} />
                </Route>
                <Route exact path='/thanks' element={<ProtectedRoute logged={adminLogged}/>}>
                    <Route path='/thanks' element={<Thanks answers={answers} ita={ita} logged={logged} setAnswers={setAnswers}/>} />
                </Route>
                <Route exact path='/thanksEmail' element={<ProtectedRoute logged={adminLogged}/>}>
                    <Route  path='/thanksEmail' element={<ThanksEmail ita={ita} logged={logged} doLogout={doLogout}/>} />
                </Route>
                <Route exact path='/furtherQuestions' element={<ProtectedRoute logged={adminLogged}/>}>
                    <Route path='/furtherQuestions' element={<FurtherQuestions deviceJwt={deviceJwt} answers={answers} ita={ita} setAnswers={setAnswers}/>}/>
                </Route>
                <Route exact path='/createAccount' element={<ProtectedRoute logged={adminLogged}/>}>
                    <Route path='/createAccount' element={<CreateAccount answers={answers} setAnswers={setAnswers} deviceJwt={deviceJwt} doLogin={doLogin} ita={ita}/>} />
                </Route>
                <Route exact path='/personal' element={<ProtectedRoute logged={adminLogged}/>}>
                    <Route path='/personal' element={<Personal logged={logged} anon={anon} ita={ita}/>} />
                </Route>
                <Route exact path='/dashboard' element={<ProtectedRoute logged={adminLogged}/>}>
                    <Route path='/dashboard' element={<Dashboard userJwt={userJwt} ita={ita}/>} />
                </Route>
            </Routes>
            {
                location.pathname!=="/" &&
                location.pathname!=="/login" &&
                location.pathname!=="/thanks" &&
                location.pathname!=="/furtherQuestions" ?
                <p style={{ "position": "fixed", "top": 50, "right": 50, "text-decoration": "underline", "font-size":"130%"}} onClick={routeHome} >Home</p> :
                null
            }
        </>
    );
}


export default App