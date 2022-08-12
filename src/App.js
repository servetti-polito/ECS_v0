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
        setUserJwt(jwtGenerator(token, deviceJwt));
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
            if(urlParams.get("personal")!=null&&urlParams.get("username")!=null) //localhost:3000/personal?user=admin&pass=admin2022&multi=personal&personal=true&username=
            {
                localStorage.setItem("personalUsername",urlParams.get("username"))
                localStorage.setItem("noNavigation","true");
                navigate("/personal")
            }
            else
                routeHome()
            localStorage.setItem("loading", false);
        }).catch((err)=>console.log(err))
    }

    const {getSession} = useContext(AccountContext);
    useEffect(()=>{
        getSession().then(session=>{
            setAdminLogged(true);
            localStorage.setItem("appJwt", session.getIdToken().getJwtToken())
            setDeviceJwt(localStorage.getItem("appJwt"))
        }).catch(setAdminLogged(false))
    }, [window.location.href])

    setInterval(()=>{
        if(userJwt!==null && userJwt.exp < Date.now()/1000)
            setUserJwt(null)
    }, 1000)

    if(localStorage.getItem("noNavigation")==="true"&&(window.location.pathname!=="/personal"&&window.location.pathname!==("/thanks")))
        return <Page404 noNavigation={true}/>

    return (
        <>
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
                    <Route path='/thanks' element={<Thanks deviceJwt={deviceJwt} answers={answers} ita={ita} logged={logged} setAnswers={setAnswers}/>} />
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
                    <Route path='/personal' element={<Personal deviceJwt={deviceJwt} logged={logged} anon={anon} ita={ita}/>} />
                </Route>
                <Route exact path='/dashboard' element={<ProtectedRoute logged={adminLogged}/>}>
                    <Route path='/dashboard' element={<Dashboard userJwt={userJwt} ita={ita}/>} />
                </Route>
            </Routes>
            {
                localStorage.getItem("noNavigation")!=="true"&&
                location.pathname!=="/" &&
                location.pathname!=="/login" &&
                location.pathname!=="/thanks" &&
                location.pathname!=="/furtherQuestions" ?
                <p style={{ "position": "fixed", "top": 25, "right": 25, "text-decoration": "underline", "font-size":"130%"}} onClick={routeHome} >Home</p> :
                null
            }
            {
                location.pathname!=="/dashboard" ?
                <div style={{"position":"absolute", "bottom":10, "width":"100%", "text-align":"center", "pointer-events":"none"}}>
                    <p style={{"font-size":"200%", "color":"#ff9724", "font-family":'Ink Free'}}>PROMET&O</p>
                </div> : null
            }
        </>
    );
}

function removeParam(sourceURL) {
    let url = sourceURL.split("?")
    let path = url[0]
    let keyValPairs = url[1].split("&")
    let finalUrl=path
    let nKV = 0
    for(let kv in keyValPairs)
    {
        let kvs = keyValPairs[kv]
        let kva=kvs.split("=")
        if(kva[0]!=="user"&&kva[0]!=="pass"&&kva[0]!=="multi")
        {
            finalUrl=nKV===0 ? finalUrl+"?"+kvs : finalUrl+"&"+kvs
            nKV++;
        }
    }
    return finalUrl
}

export default App