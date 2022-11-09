import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";

export default function Verification(props){
    const [loading, setLoading]=useState(true)
    const [outcome, setOutcome]=useState("")
    let navigate = useNavigate();
    const routeHome = () => {
        navigate("/")
    }

    useEffect(()=>{
        //prendere username e codice da query
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString).toString()
        const email = decodeURIComponent(urlParams.split("&")[0].split("=")[1])
        const code = urlParams.split("&")[1].split("=")[1]
        //controllare se username presente e codice uguale
        API.get("userTokenAPI", "/token/object").then(
            emails=>{
                const match = emails.filter(e=>e.email===email&&e.code===code)[0]
                if(match!==undefined)
                {
                    if(match["active"])
                        setOutcome(props.ita?"Il tuo account è già stato verificato":"Your account has already been verified")
                    else
                    {
                        match["active"]=true;
                        let init = {body: match}
                        console.log(init)
                        API.put("userTokenAPI", "/token", init).then(data => {
                                setOutcome(props.ita?"Il tuo account è stato verificato con successo":"Your account has been verified successfully")
                                props.doLogin(match["email"],match["token"])
                            }
                        ).catch(e=>
                            setOutcome(props.ita?"C'è stato un errore nella verifica del tuo account":"There has been an error while verifying your account")
                        )
                    }
                }
                else
                    setOutcome(props.ita?"C'è stato un errore nella verifica del tuo account":"There has been an error while verifying your account")
                setLoading(false)
            }
        )
    },[])

    return (
        <div className="container">
            {loading ?
                <>
            <div className="row h-25" />
            <div className="row h-50 align-items-center">
                <div className="col-12">
                    <h1 className="text-center">Loading...</h1>
                </div>
            </div></> :
                <>
            <div className="row h-25" />
            <div className="row h-50 align-items-center">
                <div className="col-12">
                    <h1 className="text-center display-1">{outcome}</h1>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-1"/>
                    <div className="d-grid col-lg-6 col-10">
                        <button className="btn btn-lg btn-primary" type="button" onClick={routeHome}>{props.ita ? "Torna alla home" : "Go back to home"}</button>
                    </div>
                    <div className="col-lg-3 col-1"/>
                </div>
            </div></>}
            <p id="prometeoSmallLogo" style={{marginTop:"150px"}}>PROMET&O</p>
        </div>
    );
}