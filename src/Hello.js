import './Hello.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Hello(props){

    let navigate = props.useNavigate();
    const routeSurvey = () => {navigate("/survey");}
    const routeLogin = () => {navigate("/login");}
    const toggleLanguage = () => {
        let curr = props.ita;
        props.setIta(!curr);
    }

    return (
        <div className="container">
            <div className="row h-25"/>
            <div className="row h-25 align-items-center">
                <div className="col-12" style={{padding: 50}}>
                    <h1 className="display-1 text-center">{props.ita ? "Ciao!" : "Hello!"}</h1>
                </div>
                <div className="row gap-2">
                    <div className="col-lg-3 col-1"/>
                    <div className="d-grid col-lg-6 col-10">
                        <button className="btn glow-button btn-lg btn-primary" type="button" onClick={routeSurvey}>{props.ita ? "Inizia il sondaggio" : "Start questionnaire"}</button>
                    </div>
                    <div className="col-lg-3 col-1"/>
                </div>
                <div className="row gap-2">
                    <div className="col-lg-3 col-1"/>
                    <div className="d-grid col-lg-6 col-10">
                        <button className="btn btn-lg btn-primary" type="button" onClick={routeLogin}>{props.ita ? "Accedi" : "Login"}</button>
                    </div>
                    <div className="col-lg-3 col-1"/>
                </div>
            </div>
            <div className="row h-25"/>
            <div style={{ "position": "fixed", "top": 50, "right": 50}}>
                <p onClick={toggleLanguage}>{props.ita ? <b>ITA</b> : "ITA"} | { props.ita ? "ENG" : <b>ENG</b>}</p>
            </div>
        </div>
    );
}