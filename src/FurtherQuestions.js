import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {useState} from "react";
import {Alert, Spinner} from "react-bootstrap";

export default function FurtherQuestions(props){
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const notNow = () => {
        setLoading(true)
        let init = {
            body: props.answers,
            headers: {authorization : props.deviceJwt}
        }
        API.post("userTokenAPI", "/survey", init).then(data=>{
            console.log("post ok: "+JSON.stringify(data));
            props.setAnswers(null);
            setLoading(false)
            routePersonal()
        }).catch(err=>{setLoading(false); setError("post failed: "+JSON.stringify(err.response))})
    }
    const routePersonal=()=>{
        navigate("/personal")
    }
    const routeCreate = () => {
        navigate("/createAccount")
    }

    return (
        <div className="container">
            <div className="row h-25"/>
            <div className="row h-25 align-items-center" style={{margin:50}}>
                {error=== null ? <></> : <Alert variant="danger">{error}</Alert>}
                <div className="col-12">
                    <h1 className="text-center" style={{borderBottom:"2px solid #ff9724", marginBottom: 50}}>{props.ita ? "Grazie per le tue risposte!" : "Thank you for your answers!"}</h1>
                    <h3 className="text-center">{props.ita ? "Vuoi creare un account per essere aggiornato sulle condizioni ambientali dell’ambiente in cui ti trovi?" : "Would you like to create an account to be updated on the environmental conditions of your office? "}</h3>
                </div>
                <div className="row h-25"/>
                <div className="row gap-2">
                    <div style={{"text-align": "center"}} className="row align-items-center">
                        <div className="col-6 justify-content-center">
                            <button onClick={notNow} className="btn btn-lg btn-secondary" style={{width: "50%"}} disabled={loading}>
                                {loading? <Spinner animation="border" hidden={!loading}/> : props.ita ? "Non adesso" : "Not now"}
                            </button>
                        </div>
                        <div className="col-6 justify-content-center"><button onClick={routeCreate} className="btn btn-lg btn-primary" style={{width: "75%"}}>{props.ita ? "Crea un account" : "Create an account"}</button></div>
                    </div>
                </div>
            </div>
            <p id="prometeoSmallLogo" style={{marginTop:"320px"}}>PROMET&O</p>
        </div>
    );
}