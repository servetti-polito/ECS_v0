import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {Alert} from "react-bootstrap";
import {API} from "aws-amplify";
import {useState} from "react";

export default function Thanks(props){
    const [error, setError] = useState(null);

    let navigate = useNavigate();
    const routeHome = () => {
        if(props.logged)
        {
            let init = {
                body: props.answers,
                headers: {authorization : props.deviceJwt}
            }
            API.post("userTokenAPI", "/survey", init).then(data=>{
                console.log("post ok: "+JSON.stringify(data));
                props.setAnswers(null);
                navigate("/")
            }).catch(err=>setError("post failed: "+JSON.stringify(err.response)))
        }
        else
            navigate("/")
    }

    return (
            <div className="container">
                <div className="row h-25">
                {error=== null ? <></> : <Alert variant="danger">{error}</Alert>}
                </div>
            <div className="row h-50 align-items-center">
                <div className="col-12">
                    <h1 className="display-1 text-center">{props.ita ? "Grazie per aver completato il sondaggio" : "Thanks for completing the survey"}</h1>
                </div>
                <div className="row gap-2">
                    <div className="col-lg-3 col-1"/>
                    <div className="d-grid col-lg-6 col-10">
                        <button className="btn btn-lg btn-primary" type="button" onClick={routeHome}>{props.ita ? props.logged ? "Disconnettiti e torna alla home" : "Torna alla home" : props.logged ? "Go Back Home and log out" : "Go back home"}</button>
                    </div>
                    <div className="col-lg-3 col-1"/>
                </div>
                //TODO: aggiungere immagini dato oggettivo
                Visit /*shortlink*/ (or scan /*qr*/) to get full objective and subjective data
                //TODO: ogni volta che una persona manda il questionario riceve la mail con il link per la visualizzazione dei dati
            </div>
        </div>
    );
}