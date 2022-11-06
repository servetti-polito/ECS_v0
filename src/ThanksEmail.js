import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import "./CSS/ThanksEmail.css"

export default function ThanksEmail(props){
    let navigate = useNavigate();
    const routeHome = () => {
        navigate("/")
    }

    return (
            <div className="container">
                <div className="row h-25" />
            <div className="row h-50 align-items-center">
                <div className="col-12">
                    <h1 className="display-1 text-center">{props.ita ? "Grazie per esserti registrato" : "Thanks for signing in"}</h1>
                    {/*<h3 className="display-3 text-center">{props.ita ? "Riceverai una mail di conferma" : "A confirmation email has been sent to you"}</h3>*/}
                </div>
                <div className="row">
                    <div className="col-lg-3 col-1"/>
                    <div className="d-grid col-lg-6 col-10">
                        <button className="btn btn-lg btn-primary" type="button" onClick={routeHome}>{props.ita ? "Torna alla home" : "Go back to home"}</button>
                    </div>
                    <div className="col-lg-3 col-1"/>
                </div>
            </div>
                <p id="prometeoSmallLogo" style={{marginTop:"150px"}}>PROMET&O</p>
        </div>
    );
}