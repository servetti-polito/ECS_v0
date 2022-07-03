import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

export default function Thanks(props){
    let navigate = useNavigate();
    const routeHome = () => {
        if(props.logged)
            props.doLogout();
        navigate("/")
    }

    return (
            <div className="container">
                <div className="row h-25" />
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
            </div>
        </div>
    );
}