import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {Alert, Spinner} from "react-bootstrap";
import {API} from "aws-amplify";
import {useEffect, useState} from "react";

export default function Thanks(props){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if((props.logged===null||props.logged==="")&&props.deviceJwt===null)
            navigate("/")
        if(props.answers===null&&localStorage.getItem("previousPersonal")===null)
            navigate("/")
    }, [])

    let navigate = useNavigate();
    const routeHome = () => {
        localStorage.removeItem("previousPersonal")
        setLoading(true)
        if(props.logged && error===null && props.answers!==null)
        {
            let init = {
                body: props.answers,
                headers: {Authorization : props.deviceJwt}
            }
            console.log(JSON.stringify(init))
            API.post("userTokenAPI", "/survey", init).then(data=>{
                console.log("post ok: "+JSON.stringify(data));
                props.setAnswers(null);
                navigate("/")
            }).catch(err=>{setLoading(false); setError("post failed: "+JSON.stringify(err.response))})
        }
        else
            navigate("/")
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12" style={{marginTop:20, marginBottom:0, textAlign:"center", borderBottom:"2px solid #ff9724"}}>
                    <h1>{props.ita ? "Grazie per aver completato il sondaggio": "Thank you for completing the survey"} </h1></div>
            </div>
            {error=== null ? null : <Alert variant="danger">{error}</Alert>}
            <div className="row h-75" style={{textAlign:"center", margin:10}}>
               <div style={{padding:10, height: props.logged ? "85%" : "100%"}}>Graphs</div>
                {
                    props.logged ?
                        <div style={{borderTop:"2px solid #ff9724", borderBottom:"2px solid #ff9724"}}>
                            {props.ita ? "Visita " : "Visit "}
                            <a href="https://dev.prometeo.click/chart" target="_blank" rel="noopener noreferrer">{props.ita ? "questo link" : "this link"}</a>
                            {props.ita ? " o scansiona" : " or scan"}
                            <img style={{height:100, width:100}} src="https://i.imgur.com/oGwMLLO.png"/>
                            {props.ita ? "per visualizzare tutti i dati oggettivi e soggettivi" : "to get full objective and subjective data."}
                        </div>
                    : null
                }
            </div>

            {   /*localStorage.getItem("noNavigation")==="true" ? null :*/
                <button style={{position: "absolute", right: 20, bottom: 20}} className="btn btn-lg btn-primary" type="button" onClick={routeHome} disabled={loading}>
                    {loading? <Spinner animation="border" hidden={!loading}/> : props.ita ? "Torna alla home" : "Go back home"}
                </button>
            }
            </div>
    );
}