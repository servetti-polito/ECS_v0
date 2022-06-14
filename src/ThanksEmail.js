import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

export default function ThanksEmail(props){
    let navigate = useNavigate();
    const routeHome = () => {
        if(props.logged)
            props.doLogout();
        navigate("/")
    }

    return (
            <div className="container">
            <div className="row h-75 align-items-center">
                <div className="col-12">
                    <h1 className="display-1 text-center">{props.ita ? "Grazie per esserti registrato" : "Thanks for signing in"}</h1>
                    <h3 className="display-3 text-center">{props.ita ? "Riceverai una mail di conferma" : "A confirmation email has been sent to you"}</h3>
                </div>
                <div className="row gap-2">
                    <div className="col-lg-3 col-1"/>
                    <div className="d-grid col-lg-6 col-10">
                        <button className="btn btn-lg btn-primary" type="button" onClick={routeHome}>{props.ita ? "Torna alla home" : "Go back home"}</button>
                    </div>
                    <div className="col-lg-3 col-1"/>
                </div>
            </div>
        </div>
    );
}