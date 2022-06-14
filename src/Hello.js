import './Hello.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Hello(props){

    let navigate = props.useNavigate();
    const routeSurvey = () => {navigate("/survey");}
    const routeLogin = () => {navigate("/login");}
    return (
        <div className="container">
            <div className="row h-75 align-items-center">
                <div className="col-12">
                    <h1 className="display-1 text-center">{props.ita ? "Ciao!" : "Hello!"}</h1>
                </div>
                <div className="row gap-2">
                    <div className="col-lg-3 col-1"/>
                    <div className="d-grid col-lg-6 col-10">
                        <button className="btn btn-lg btn-primary" type="button" onClick={routeSurvey}>{props.ita ? "Inizia il sondaggio" : "Start questionnaire"}</button>
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
            <div style={{ "position": "fixed", "bottom": 50, "left": 50}}>
                <img alt={props.ita? "Language:english" : "Lingua:italiano" } src = {props.ita ? "https://i.imgur.com/AxG0Rjf.png" : "https://i.imgur.com/4oRTtkc.png"} width="200" height="100" onClick={()=>{
                    if(props.ita)
                        props.setIta(false)
                    else
                        props.setIta(true)
                }}/>
            </div>
        </div>
    );
}