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
        let init = {
            body:{
                email:email,
                code:code
            }
        }
        API.put("userTokenAPI", "/token", init).then(data => {
            console.log("data: "+JSON.stringify(data))
            console.log(data["token"])
            let initLogin={body: {token:data["token"]}}
            API.post("userTokenAPI", "/token", initLogin).then(user=>{
                let myjwt = user["jwt"]
                console.log("test: "+JSON.stringify(user))
                console.log(user["email"]+"+"+user["token"])
                if(user.email===null)
                {
                    setOutcome(props.ita ? "Si è verificato un errore" : "An error occourred");
                    setLoading(false)
                }
                else {
                    console.log("user email: " + user.email)
                    props.doLogin(user.email, user.token, myjwt).then(()=>{
                        setLoading(false)
                        setOutcome(props.ita?"Il tuo account è stato verificato con successo":"Your account has been verified successfully")
                    })
                }
            }).catch(err=>console.log("login fail:",err))
        }).catch(err=>
        {
            console.log(JSON.stringify(err.response["data"]["error"]))
            if(err.response["data"]["error"]==="Already verified")
                setOutcome(props.ita?"Il tuo account è già stato verificato":"Your account has already been verified")
            else
                setOutcome(props.ita?"C'è stato un errore nella verifica del tuo account":"There has been an error while verifying your account")
            setLoading(false)
        }
        );
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