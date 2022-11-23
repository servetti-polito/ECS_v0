import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {Alert, Spinner} from "react-bootstrap";
import {API} from "aws-amplify";
import {useEffect, useState} from "react";
import qrcode from "./resources/images/qrcode.png"
import "./CSS/Thanks.css"
import emailsText from "./resources/emails.json";

export default function Thanks(props){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sentence, setSentence] = useState("")

    const routeHome=()=>{
        navigate("/")
    }
    let navigate = useNavigate();
    const sentenceFun = (message, ita) =>
    {
        let result = ""
        console.log(JSON.stringify(message))
        if(message["temp"]!==null)
        {
            result+= ita?"Il tuo Comfort Termico è "+message["temp"]+"%":"Your Thermal Comfort is "+message["temp"]+"%"
        }
        if(message["light"]!==null)
        {
            if(result==="")
                result+=ita?"Il tuo Comfort Visivo è "+message["light"]+"%":"Your Visual Comfort is "+message["light"]+"%"
            else
                result+=ita?", il Comfort Visivo "+message["light"]+"%":", Visual Comfort "+message["light"]+"%"
        }
        if(message["sound"]!==null)
        {
            if(result==="")
                result+=ita?"Il tuo Comfort Acustico è "+message["sound"]+"%":"Your Acoustic Comfort is "+message["sound"]+"%"
            else
                result+=ita?", il Comfort Acustico "+message["sound"]+"%":", Acoustic Comfort "+message["sound"]+"%"
        }
        if(message["air"]!==null)
        {
            if(result==="")
                result+=ita?"La tua Qualità dell'Aria è "+message["air"]+"%":"Your Indoor Air Quality is "+message["air"]+"%"
            else
                result+=ita?", la Qualità dell'Aria "+message["air"]+"%":", Indoor Air Quality "+message["air"]+"%"
        }
        return result
    }

    useEffect(()=>{
        ////////////////////////////////////////////////////////
        if((props.logged===null||props.logged==="")&&props.deviceJwt===null)
            navigate("/")
        if(props.answers===null&&localStorage.getItem("previousPersonal")===null) {
            routeHome()
        }
        ///////////////////////////////////////////////////////
        setLoading(true)
        if(props.logged && error===null && props.answers!==null)
        {
            //MQTT/////////////////////////////////////////////////////////
            let message = evaluateComfort(props.answers)
            setSentence(sentenceFun(message, props.ita))
            let QoS = {qos: 1};
            let topic = localStorage.getItem("multi")+"/questionnaire"
            props.client.publish(topic,JSON.stringify(message),QoS)
            //////////////////////////////////////////////////////////////*/
            let init = {
                body: props.answers,
                headers: {Authorization : props.deviceJwt}
            }
            API.post("userTokenAPI", "/survey", init).then(data=>{

                API.get("userTokenAPI","/survey/user?user="+props.logged, {headers: {Authorization : localStorage.getItem("userJwt")}}).then(data=>{
                    if(localStorage.getItem("previousPersonal")===null)
                    {
                        props.setAnswers(null);
                        if (data.length === 1)
                        {
                            let object = props.ita ? "Grazie per la tua prima risposta su Promet&o" : "Thanks for taking your first survey on Promet&o"
                            let message = props.ita ? emailsText["survey"]["it"] : emailsText["survey"]["en"]
                            let init = {
                                mode: "no-cors",
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${props.deviceJwt}`
                                },
                                body: JSON.stringify({
                                    "email": props.answers.user,
                                    "object": object,
                                    "message": message
                                })
                            }
                            console.log("sending mail..."+JSON.stringify(init))
                            fetch("https://822240w7r0.execute-api.eu-west-3.amazonaws.com/sampledev/sendEmail", init)
                                .then(data => {setLoading(false);})
                                .catch(err => {setLoading(false);setError("MAIL FAILED" + err)})
                        }
                        else {setLoading(false);}
                    }
                    else {
                        localStorage.removeItem("previousPersonal")
                        setLoading(false);
                    }
                }).catch(err=>{setLoading(false); setError(props.ita? "Si è verificato un errore: "+JSON.stringify(err.response) : "An error occourred: "+JSON.stringify(err.response))})
            }).catch(err=>{setLoading(false); setError(props.ita? "Si è verificato un errore: "+JSON.stringify(err.response) : "An error occourred: "+JSON.stringify(err.response))})
        }
        else
        {
            setLoading(false);
        }
    }, [])

    const iframes = {
        "Temp": <iframe  style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=23"  frameBorder="0"/>,
        "Light": <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24"  frameBorder="0"/>,
        "Sound": <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26"  frameBorder="0"/>,
        "Air": <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25"  frameBorder="0"/>,
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12" style={{marginTop:20, marginBottom:0, textAlign:"center", borderBottom:"2px solid #ff9724"}}>
                    <h1 id="thanksTitle">{props.ita ? "Grazie per aver completato il sondaggio": "Thank you for completing the survey"} </h1></div>
            </div>
            <div className="row h-75" style={{textAlign:"center", margin:10}}>
                {
                    error===null?
                        <div style={{padding:10, height: props.logged ? "85%" : "100%"}}>
                            {
                                props.NO_DASH ? null :
                                <div className="container" style={{height:"90%"}}>
                                    {
                                        //<h5>{props.ita? "Di seguito puoi vedere i grafici sull'indagine del comfort in tempo reale" : "Below are the graphs related to the real time comfort assessment"}</h5>
                                    }
                                    <h5 style={{fontSize:"100%", margin:0}}>{sentence}</h5>
                                    <h5 style={{fontSize:"100%", margin:0}}>{props.ita?"Confronta con i dati oggettivi riportati di seguito.":"Compare with objective data below."}</h5>
                                    <div className="row h-50">
                                        <div className="col-6">{iframes["Temp"]}</div>
                                        <div className="col-6">{iframes["Light"]}</div>
                                    </div>
                                    <div className="row h-50">
                                        <div className="col-6">{iframes["Sound"]}</div>
                                        <div className="col-6">{iframes["Air"]}</div>
                                    </div>
                                </div>
                            }
                        </div> :
                        <div style={{padding:10, height: props.logged ? "85%" : "100%"}}><Alert variant="danger"><h3>{error}</h3></Alert></div>
                }
                {
                    props.logged&& !props.NO_DASH ?
                        <div style={{borderTop:"2px solid #ff9724", borderBottom:"2px solid #ff9724", fontSize:"150%"}}>
                            {props.ita ? "Visita " : "Visit "}
                            <a href="https://dev.prometeo.click/chart" target="_blank" rel="noopener noreferrer">{props.ita ? "questo link" : "this link"}</a>
                            {props.ita ? " o scansiona" : " or scan"}
                            <img style={{height:100, width:100}} src={qrcode}/>
                            {props.ita ? "per visualizzare tutti i dati oggettivi e soggettivi" : "to get full objective and subjective data."}
                        </div>
                    : null
                }
            </div>

            {
                <button style={{position: "absolute", right: 20, bottom: 20}} className="btn btn-lg btn-primary" type="button" onClick={routeHome} disabled={loading}>
                    {loading? <Spinner animation="border" hidden={!loading}/> : props.ita ? "Torna alla home" : "Go back to home"}
                </button>
            }
            <p id="prometeoSmallLogo" style={{marginTop:"40px"}}>PROMET&O</p>
            </div>
    );
}

function evaluateComfort(answers){
    let result = {
        "temp":null,
        "light":null,
        "sound":null,
        "air":null,
        "IEQ":null,
        "timestamp":0
    }
    console.log("ANSWERS:"+JSON.stringify(answers))
    if(answers["Q1"]==="4"||answers["Q1"]==="3")
    {
        result["temp"]=100
        result["light"]=100
        result["sound"]=100
        result["air"]=100
        result["IEQ"]=100
        result["timestamp"]=0

        if(answers["Q2"].includes("THERMAL  COMFORT"))
        {
            let q3,q4, TC;
            switch(answers["Q3"])
            {
                case "3": q3=25; break;
                case "2": q3=50; break;
                case "1": q3=75; break;
                case "0": q3=100; break;
                case "-1": q3=75; break;
                case "-2": q3=50; break;
                case "-3": q3=25; break;
            }
            switch(answers["Q4"])
            {
                case "4": q4=25; break;
                case "3": q4=50; break;
                case "2": q4=75; break;
                case "1": q4=100; break;
            }
            TC=(q3+q4)/2
            result["temp"]=TC;
        }
        if(answers["Q2"].includes("ACOUSTIC  COMFORT"))
        {
            let q5, AC;
            switch(answers["Q5"])
            {
                case "4": q5=25; break;
                case "3": q5=50; break;
                case "2": q5=75; break;
                case "1": q5=100; break;
            }
            AC=q5
            result["sound"]=AC;
        }
        if(answers["Q2"].includes("VISUAL  COMFORT"))
        {
            let q7, VC;
            switch(answers["Q7"])
            {
                case "4": q7=25; break;
                case "3": q7=50; break;
                case "2": q7=75; break;
                case "1": q7=100; break;
            }
            VC=q7
            result["light"]=VC;
        }
        if(answers["Q2"].includes("INDOOR AIR QUALITY"))
        {
            let q10, IAQ;
            switch(answers["Q10"])
            {
                case "4": q10=25; break;
                case "3": q10=50; break;
                case "2": q10=75; break;
                case "1": q10=100; break;
            }
            IAQ=q10
            result["air"]=IAQ;
        }
        result["IEQ"]=(result["air"]+result["light"]+result["temp"]+result["sound"])/4
    }
    if(answers["Q1"]==="2"){
        if(answers["Q2.5"].includes("THERMAL  COMFORT"))
            result["temp"]=75
        if(answers["Q2.5"].includes("ACOUSTIC  COMFORT"))
            result["sound"]=75
        if(answers["Q2.5"].includes("VISUAL  COMFORT"))
            result["light"]=75
        if(answers["Q2.5"].includes("INDOOR AIR QUALITY"))
            result["air"]=75
        result["IEQ"]=75
    }
    if(answers["Q1"]==="1"){
        if(answers["Q2.5"].includes("THERMAL  COMFORT"))
            result["temp"]=100
        if(answers["Q2.5"].includes("ACOUSTIC  COMFORT"))
            result["sound"]=100
        if(answers["Q2.5"].includes("VISUAL  COMFORT"))
            result["light"]=100
        if(answers["Q2.5"].includes("INDOOR AIR QUALITY"))
            result["air"]=100
        result["IEQ"]=100
    }
    result["timestamp"]=answers["timestamp"]
    console.log(JSON.stringify(result))
    return result;
}
