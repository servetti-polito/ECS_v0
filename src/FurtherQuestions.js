import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

export default function FurtherQuestions(props){
    let navigate = useNavigate();
    const routePersonal = () => {
        navigate("/personal")
    }
    const routeCreate = () => {
        navigate("/createAccount")
    }

    return (
        <div className="container">
            <div className="row h-25"/>
            <div className="row h-25 align-items-center">
                <div className="col-12">
                    <h1 className="display-1 text-center">{props.ita ? "Grazie per aver risposto al sondaggio!" : "Thank you for your answers!"}</h1>
                    <h3 className="text-center">{props.ita ? "Vuoi creare un account per essere sempre aggiornato sulle condizioni ambientali nel tuo ufficio?" : "Would you like to create an account to be updated on the environmental conditions of your office?"}</h3>
                </div>
                <div className="row h-25"/>
                <div className="row gap-2">
                    <div style={{"text-align": "center"}} className="row align-items-center">
                        <div className="col-6 justify-content-center"><button onClick={routePersonal} className="btn btn-lg btn-secondary" style={{width: "50%"}}>{props.ita ? "Non ora" : "Not now"}</button></div>
                        <div className="col-6 justify-content-center"><button onClick={routeCreate} className="btn btn-lg btn-primary" style={{width: "50%"}}>{props.ita ? "Crea un account" : "Create an account"}</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}