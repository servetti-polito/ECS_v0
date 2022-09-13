import './CSS/Hello.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Hello(props){

    let navigate = props.useNavigate();
    const routeSurvey = () => {navigate("/survey");}
    const routeLogin = () => {navigate("/login");}
    const routeProfile = () => {navigate("/profile");}
    const toggleLanguage = () => {
        let curr = props.ita;
        props.setIta(!curr);
    }

    return (
        <div className="container" style={{backgroundColor: '#FF9724'}}>
            <div className="row" style={{height: "20%"}}>
                {props.logged !== "" && props.logged !== null ?
                    <div className="row h-25">
                        <div className="col-6" style={{padding:"50px"}}>
                            <h5 style={{display: "inline-block", padding: "10px"}}>{props.ita ? "Ciao" : "Hello"}, {props.logged}</h5>
                            <p onClick={props.doLogout} style={{display: "inline-block", textDecoration: "underline"}}> Log out</p>
                        </div>
                    </div> : <div className="row h-25"/>
                }
            </div>
            <div className="row h-25 align-items-center">
                <div className="col-12" style={{backgroundColor: "white", marginBottom:50}}>
                    <h1 className="display-1 text-center" style={{"color":"#ff9724", "font-family":'Ink Free'}}>PROMET&O</h1>
                </div>
                <div className="col-12" style={{padding: 50}}>
                    <h1 className="display-1 text-center" style={{"color":"white"}}>{props.ita ? "Ciao!" : "Hello!"}</h1>
                </div>
                {   props.deviceJwt === null ? null : <>
                    <div className="row gap-2">
                    <div className="col-lg-2 col-1"/>
                    <div className="d-grid col-lg-8 col-10">
                        <button  style={{"font-size": "175%", "color":"#ff9724"}} className="btn glow-button btn-lg btn-white" type="button" onClick={routeSurvey}>{props.ita ? "Inizia il sondaggio" : "Start the questionnaire on Indoor Environmental Quality"}</button>
                    </div>
                    <div className="col-lg-2 col-1"/>
                </div>
                <div style={{margin:"20px"}}/></> }
                <div className="row gap-2">
                    <div className="col-lg-2 col-1"/>
                    <div className="d-grid col-lg-8 col-10">
                        {
                            props.logged !== null && props.logged !== "" ?
                                <button style={{"font-size": "175%",  "color":"#ff9724"}} className="btn btn-lg btn-white" type="button"
                                        onClick={routeProfile}>{props.ita ? "Profilo" : "Profile"}</button>
                                :
                                <button style={{"font-size": "175%",  "color":"#ff9724"}} className="btn btn-lg btn-white" type="button"
                                    onClick={routeLogin}>{props.ita ? "Accedi" : "Login"}</button>
                        }
                    </div>
                    <div className="col-lg-2 col-1"/>
                </div>
            </div>
            <div className="row h-25"/>
            <div style={{ "position": "fixed", "top": 50, "right": 50}}>
                <p onClick={toggleLanguage}>{props.ita ? <b>ITA</b> : "ITA"} | { props.ita ? "ENG" : <b>ENG</b>}</p>
            </div>
        </div>
    );
}