import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/dashboard.css'
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import template from "./resources/GrafanaReqTemplate.json";
import air from "./resources/images/air.png";
import temp from "./resources/images/temp.png";
import light from "./resources/images/light.png";
import IEQ from "./resources/images/ieq.png";
import sound from "./resources/images/sound.png";


export default function Dashboard(props) {

    const titles = {
        "RH": props.ita ? "Umidità relativa":"Relative Humidity",
        "T":props.ita ? "Temperatura dell'aria":"Air temperature",
        "Temp": props.ita ? "Comfort termico": "Thermal Comfort",
        "SPL":props.ita ? "Livello di pressione sonora":"Sound Pressure Level",
        "VOC":props.ita ? "Composti organici volatili":"Volatile Organic Compounds",
        "CH2O":props.ita ? "Formaldeide":"Formaldehyde",
        "CO2":props.ita?"Anidride carbonica":"Carbon dioxide",
        "CO":props.ita?"Monossido di carbonio":"Carbon monoxide",
        "NO2":props.ita?"Biossido di azoto":"Nitrogen dioxide",
        "PM10":props.ita?"PM10":"Particulate Matter 10",
        "PM2.5":props.ita?"PM2.5":"Particulate Matter 2.5",
        "E":props.ita?"Illuminazione":"Illuminance",
        "IEQ": props.ita ? "Qualità dell'ambiente interno" : "Indoor Environmental Quality",
        "init": props.ita ? "Qualità dell'ambiente interno" : "Indoor Environmental Quality",
        "Air": props.ita ? "Qualità dell'aria interna" : "Indoor Air Quality",
        "Light": props.ita ? "Comfort visivo":"Visual Comfort",
        "Sound": props.ita ? "Comfort acustico":"Acoustic Comfort"
    }
    const explain = {
        "RH":props.ita ? "Spiegazione su RH":"The value gives the composition of the air in terms of water vapour in relation to the maximum amount it can hold at a given temperature characterize the relative humidity of the environment.",
        "T":props.ita ? "Spiegazione su temperatura dell'aria":"Air temperature is the temperature of the air around the human body. ",
        "Temp": props.ita ? "Spiegazione su comfort termico" : "Thermal comfort is that condition of mind which expresses satisfaction with the thermal environment. ",
        "SPL":props.ita? "Spiegazione su SPL":"Logarithm of the ratio of a given sound pressure to the reference sound pressure. Sound pressure level in decibels is 20 times the logarithm to the base ten of the ratio.",
        "VOC":props.ita? "Spiegazione su VOC":"Volatile organic compounds are organic chemical compounds whose composition makes it possible for them to evaporate under normal indoor atmospheric conditions of temperature and pressure. Are toxic by inhalation and exposition, with chronic or acute effects.",
        "CH2O":props.ita? "Spiegazione su Formaldeide":"Formaldehyde is a colourless gas, flammable and highly reactive at room temperature. It is formed primarily by numerous natural sources and anthropogenic activities.",
        "CO2":props.ita?"Spiegazione su Anidride Carbonica":"Carbon dioxide is a colourless and odourless gas at atmospheric temperature and pressure. It is produced by the combustion of organic compounds.",
        "CO":props.ita?"Spiegazione su monossido di carbonio":"Carbon monoxide is a colourless, non-irritant, odourless and tasteless toxic gas. It is produced by the incomplete combustion of carbonaceous fuels such as wood, petrol, coal, natural gas and kerosene.",
        "NO2":props.ita?"Spiegazione su biossido di azoto":"Nitrogen dioxide in its gaseous form is volatile, reddish-brown in colour and heavier than air. It has a characteristic pungent odour perceptible from a concentration of 188 μg/m3 (0.1 ppm). It is one of the principal nitrogen oxides associated with combustion sources.",
        "PM10":props.ita?"Spiegazione su PM10":"Inhalable particles, with diameters that are 10 micrometers or smaller.",
        "PM2.5":props.ita?"Spiegazione su PM2.5":"Fine inhalable particles, with diameters that are 2.5 micrometers or smaller. ",
        "E":props.ita?"Spiegazione su illuminazione":"Illuminance is the ratio between the luminous flux incident on an elementary surface and the area of the elementary surface itself. ",
        "IEQ": props.ita ? "Spiegazione su qualità dell'ambiente interno":"Indoor Environmental Quality is the physical characterization of indoor environments in terms of thermal, acoustic, lighting and indoor air quality.",
        "init": props.ita ? "Spiegazione su qualità dell'ambiente interno":"Indoor Environmental Quality is the physical characterization of indoor environments in terms of thermal, acoustic, lighting and indoor air quality.",
        "Air": props.ita ? "Spiegazione su qualità dell'aria" : "Indoor air quality is considered acceptable when there are no specific pollutants in harmful concentrations and no conditions that are likely to be associated with occupant's health or comfort complaints.",
        "Light": props.ita ? "Spiegazione su comfort visivo" : "Visual comfort is that condition of satisfaction of visual requirements expressed by the user.",
        "Sound": props.ita? "Spiegazione su comfort acustico" : "Acoustic comfort is that condition, in a specific environment, in which the user experiences a sense of well-being related to the hearing conditions."
    }
    let [showGraph, setShowGraph] = useState(false)
    let [timeWindow, setTimeWindow] = useState("RT")
    let [topic, setTopic] = useState("init")
    let [RTValues, setRTValues] = useState({
        RH:"...",
        T:"...",
        Temp:"...",
        SPL:"...",
        VOC:"...",
        CH2O:"...",
        CO2:"...",
        CO:"...",
        NO2:"...",
        PM10:"...",
        "PM2.5":"...",
        E:"..."
    })

    let navigate = useNavigate();
    const toggleGraph = () => {setShowGraph(!showGraph);}

    useEffect(()=>{
        if (props.userJwt === null) {
            navigate("/login")
        }
    },[])

        return (
            <div id="Dashboard" className="container">
                <div className="row h-100">
                    <div className="container col-4" style={{backgroundColor: "#FF9724", borderRadius: "50px"}}>
                        <div className="row">
                            <h1 id="dashPrometeo" style={{textAlign: "center", marginTop: "20px", fontFamily: 'Ink Free'}}>PROMET&O</h1>
                        </div>
                        <Clock/>
                        <div className="row">
                            <h2 id="dashTitle" style={{textAlign: "center", paddingTop: "50px"}}>{titles[topic]}</h2>
                        </div>
                        <div className="row">
                            <h5 id="dashExplain" style={{textAlign: "center", padding: "20px"}}>{explain[topic]}</h5>
                        </div>
                        <Compliances topic={topic} timeWindow={timeWindow} ita={props.ita}/>
                        <div className="row" style={{position:"fixed", bottom:"50px", width:"34%"}}>
                            <div className="row justify-content-center">
                                <button style={{fontSize: "150% !important", "width": "75%", "color": "#FF9724"}}
                                        className="btn btn-white" type="button"
                                        onClick={toggleGraph}>{showGraph ? props.ita?"Nascondi il grafico":"Hide the graph" : props.ita?"Mostra il grafico":"Show the graph"}</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div style={{margin: "9%"}}/>
                        <div className="row" style={{width: "95%"}}>
                            <div className="col">
                                <button id="timeButton" className={timeWindow === "RT" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("RT")}}>RT</button>
                            </div>
                            <div className="col">
                                <button id="timeButton" className={timeWindow === "3H" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("3H")}}>3H</button>
                            </div>
                            <div className="col">
                                <button id="timeButton" className={timeWindow === "12H" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("12H")}}>12H</button>
                            </div>
                            <div className="col">
                                <button id="timeButton" className={timeWindow === "24H" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("24H")}}>24H</button>
                            </div>
                            <div className="col">
                                <button id="timeButton" className={timeWindow === "3D" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("3D")}}>3D</button>
                            </div>
                            <div className="col">
                                <button id="timeButton" className={timeWindow === "1W" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("1W")}}>1W</button>
                            </div>
                            <div className="col">
                                <button id="timeButton" className={timeWindow === "1M" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("1M")}}>1M</button>
                            </div>
                        </div>
                            <div id="graphBox" style={{height: "70%", marginTop: "25px", marginBottom: "25px"}}>
                                    {showGraph ?
                                        <DashGraphs timeWindow={timeWindow} topic={topic}/>
                                        :
                                        <DashIframes timeWindow={timeWindow} topic={topic} setTopic={setTopic} RTValues={RTValues}/>
                                    }
                            </div>
                    </div>
                </div>
            </div>
        );

    function Compliances () {
        let [showCompliances, setShowCompliances] = useState(false)
        const measures = {
            "RH": "%",
            "T":"°C",
            "SPL":"dB(A)",
            "VOC": "µg/m³",
            "CH2O":"µg/m³",
            "CO2":"ppm",
            "CO":"mg/m³",
            "NO2":"µg/m³",
            "PM10":"µg/m³",
            "PM2.5":"µg/m³",
            "E":"lux",
            "IEQ": "%",
            "Temp":"%",
            "Air": "%",
            "Light": "%",
            "Sound": "%"
        }
        const refValues = {
            "RH": props.ita?"Intervallo di riferimento: ":"Reference Range: "+"25-60%",
            "T":props.ita?"Intervallo di riferimento: ":"Reference Range: "+"20-24°C",
            "SPL":props.ita?"Valore di riferimento: ":"Reference Value: "+"≤ 40 dB(A)",
            "VOC":props.ita?"Valore di riferimento: ":"Reference Value: "+"≤ 800 µg/m³",
            "CH2O":props.ita?"Valore di riferimento: ":"Reference Value: "+"≤ 800 µg/m³",
            "CO2":props.ita?"Valore di riferimento: ":"Reference Value: "+"≤ 800 ppm",
            "CO":props.ita?"Valore di riferimento: ":"Reference Value: "+"≤ 100 mg/m³",
            "NO2":props.ita?"Valore di riferimento: ":"Reference Value: "+"≤ 200 µg/m³",
            "PM10":props.ita?"Valore di riferimento: ":"Reference Value: "+"≤ 50 µg/m³",
            "PM2.5":props.ita?"Valore di riferimento: ":"Reference Value: "+"≤ 25 µg/m³",
            "E":props.ita?"Valore di riferimento: ":"Reference Value: "+"≥ 500 lux",
            "IEQ": "",
            "Temp":"",
            "Air": "",
            "Light": "",
            "Sound": ""
        }

        useEffect(()=>{
            const APIcall = setInterval(()=>{
                template.from=(new Date()-5000).toString();
                template.to=(new Date()-0).toString();
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        let result = JSON.parse(xhttp.responseText)
                        for(let t in result["results"])
                        {
                            console.log("topic to be changed",t)
                            let updatedValue = {[t==="Ta"?"T":t]:parseFloat(result["results"][t]["frames"][0]["data"]["values"][1][0]).toFixed(0)+" "+measures[t==="Ta"?"T":t]}
                            console.log("updated value", updatedValue)
                            setRTValues(rtv => ({
                                ...rtv,
                                ...updatedValue
                            }))
                        }
                    }
                    else if (this.readyState === 4 && this.status !== 200)
                        console.log("ERROR "+xhttp.statusText)
                };
                xhttp.open("POST", "https://dev.prometeo.click/chart/api/ds/query", true);
                xhttp.setRequestHeader("Content-Type","application/json")
                xhttp.setRequestHeader("Host","dev.prometeo.click",)
                xhttp.send(JSON.stringify(template));
            },5000)
            return ()=>clearInterval(APIcall);
        },[])

        const toggleCompliance = () => {
            setShowCompliances(!showCompliances);
        }
        return (
            <div style={{background:"#fff", borderRadius:"20px", height:"25%"}}>
                <div className="row">
                    {
                        topic!=="IEQ"&&topic!=="Air"&&topic!=="Temp"&&topic!=="Light"&&topic!=="Sound" ?
                            <h4 id="compliance" style={{textAlign: "center", textDecoration:"1px solid black"}}>{refValues[topic==="init"?"IEQ":topic]}</h4>
                            : null
                    }
                </div>
                <div className="row" id="compliances">
                    {showCompliances&&timeWindow==="RT" ?
                        props.ita?
                            <h4 id="compliance" style={{textAlign: "center"}}>Media: ...<br/>Deviazione Standard: ...<br/>10° Percentile: ...<br/>90° Percentile: ...</h4> :
                            <h4 id="compliance" style={{textAlign: "center"}}>Mean Value: ...<br/>Standard Deviation: ...<br/>10th Percentile: ...<br/>90th Percentile: ...</h4>
                        : timeWindow==="RT"?<h4 id="compliance" style={{textAlign: "center"}}>{props.ita?"Valore in tempo reale: ":"Real-time value: "}{RTValues[topic==="init"?"IEQ":topic]}</h4>:null
                    }
                </div>
                <div className="row" style={{position:"absolute", bottom:"20px", right:"20px",width:"20%"}}>
                    <button disabled={showGraph} className="btn btn-white-border btn-compliances" type="button"
                            onClick={toggleCompliance}>{props.ita ? showCompliances? "Nascondi normative" : "Mostra normative" : showCompliances ? "Hide compliance" : "Show compliance"}</button>
                </div>
            </div>)
    }
}

function Clock (){
    let [date, setDate] = useState("")
    let [time, setTime] = useState("")
    setInterval(() => {
        let dateTime = new Date();
        let timeString = dateTime.toTimeString().split(' ')[0].slice(0, -3)
        let dateString = dateTime.toLocaleDateString('en-GB')
        setDate(dateString)
        setTime(timeString)
    }, 1000)
    return (
        <div className="row">
            <div className="col-5" style={{backgroundColor: "white", borderRadius: "10px", marginRight: "2.5%", marginLeft: "5%"}}>
                <h3 id="clock" style={{textAlign: "center", margin: "5px", marginLeft: 0, letterSpacing: "-1px", color: "#FF9724"}}>{date}</h3>
            </div>
            <div className="col-5" style={{backgroundColor: "white", borderRadius: "10px", marginLeft: "2.5%", marginRight: "5%"}}>
                <h3 id="clock" style={{textAlign: "center", margin: "5px", color: "#FF9724"}}>{time}</h3>
            </div>
        </div>
    )
}
function DashGraphs(props) {
    const iframes = {
        "Temp": {
            "RT": <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=23&refresh=5s"  frameBorder="0"/>,
            "3H": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "12H": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "24H": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "3D": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "1W": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "1M": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>
        },
        "T": {
            "RT": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=23&refresh=5s"  frameBorder="0"/>,
            "3H": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "12H": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "24H": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "3D": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "1W": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "1M": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>
        },
        "RH": {
            "RT": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=23&refresh=5s"  frameBorder="0"/>,
            "3H": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "12H": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "24H": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "3D": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "1W": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
            "1M": <iframe  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>
        },
        "Light": {
            "RT":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "3H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "12H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "24H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "3D":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "1W":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "1M":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
        },
        "E": {
            "RT":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "3H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "12H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "24H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "3D":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "1W":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            "1M":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
        },
        "Sound": {
            "RT":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "3H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "12H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "24H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "3D":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "1W":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "1M":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
        },
        "SPL": {
            "RT":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "3H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "12H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "24H":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "3D":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "1W":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            "1M":<iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
        },
        "Air": {
            "RT" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "12H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "24H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3D" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1W" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1M" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
        },
        "PM2.5": {
            "RT" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "12H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "24H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3D" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1W" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1M" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
        },
        "PM10": {
            "RT" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "12H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "24H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3D" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1W" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1M" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
        },
        "NO2": {
            "RT" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "12H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "24H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3D" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1W" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1M" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
        },
        "CO": {
            "RT" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "12H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "24H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3D" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1W" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1M" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
        },
        "CO2": {
            "RT" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "12H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "24H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3D" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1W" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1M" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
        },
        "CH2O": {
            "RT" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "12H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "24H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3D" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1W" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1M" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
        },
        "VOC": {
            "RT" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "12H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "24H" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "3D" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1W" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            "1M" : <iframe id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
        }
    }
    if(props.topic==="IEQ"||props.topic==="init")
        return (
            <div className="container" style={{height:"100%"}}>
                <div className="row h-50">
                    <div className="col-6">{iframes["Temp"][props.timeWindow]}</div>
                    <div className="col-6">{iframes["Light"][props.timeWindow]}</div>
                </div>
                <div className="row h-50">
                    <div className="col-6">{iframes["Sound"][props.timeWindow]}</div>
                    <div className="col-6">{iframes["Air"][props.timeWindow]}</div>
                </div>
            </div>
        );
    else
        return(
            <div className="container" style={{height:"100%"}}>
                {iframes[props.topic][props.timeWindow]}
            </div>
        )

}
function DashIframes(props) {

    const iframes = {
        "Temp":{
            "RT": <iframe id="dashGauge" title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
            "3H": <iframe id="dashGauge" title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
            "12H": <iframe id="dashGauge" title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
            "24H": <iframe id="dashGauge" title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
            "3D": <iframe id="dashGauge" title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
            "1W": <iframe id="dashGauge" title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
            "1H": <iframe id="dashGauge" title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>
        },
        "Sound":{
            "RT": <iframe id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
            "3H": <iframe id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
            "12H": <iframe id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
            "24H": <iframe id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
            "3D": <iframe id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
            "1W": <iframe id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
            "1H": <iframe id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>
        },
        "IEQ":{
            "RT": <iframe id="dashIEQ" title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
            "3H": <iframe id="dashIEQ" title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
            "12H": <iframe id="dashIEQ" title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
            "24H": <iframe id="dashIEQ" title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
            "3D": <iframe id="dashIEQ" title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
            "1W": <iframe id="dashIEQ" title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
            "1H": <iframe id="dashIEQ" title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>
        },
        "Light":{
            "RT": <iframe id="dashGauge" title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
            "3H": <iframe id="dashGauge" title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
            "12H": <iframe id="dashGauge" title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
            "24H": <iframe id="dashGauge" title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
            "3D": <iframe id="dashGauge" title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
            "1W": <iframe id="dashGauge" title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
            "1H": <iframe id="dashGauge" title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>
        },
        "Air":{
            "RT": <iframe id="dashGauge" title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
            "3H": <iframe id="dashGauge" title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
            "12H": <iframe id="dashGauge" title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
            "24H": <iframe id="dashGauge" title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
            "3D": <iframe id="dashGauge" title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
            "1W": <iframe id="dashGauge" title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
            "1H": <iframe id="dashGauge" title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>
        }
    }

    return (
        <div className="row" style={{height: "100%", margin: "10px"}}>
            <div className="col-4">
                <div className="row" style={{height: "33%"}}>
                    <div className="col-6">
                        <div className="row" style={{height: "50%"}}/>
                        <div className="holder" style={{borderColor: "#c2a29f", opacity : props.topic==="IEQ"||props.topic==="T"?1:0.2 }}
                             hidden = {props.topic!=="IEQ"&&props.topic!=="Temp"&&props.topic!=="RH"&&props.topic!=="T"}>
                            {props.topic!=="IEQ"&&props.topic!=="Temp"&&props.topic!=="RH"&&props.topic!=="T" ? null
                                : <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>T<sub>a</sub></p>{props.RTValues["T"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("T")}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="holder" style={{borderColor: "#c2a29f", opacity : props.topic==="IEQ"||props.topic==="RH"?1:0.2 }}
                             hidden = {props.topic!=="IEQ"&&props.topic!=="Temp"&&props.topic!=="RH"&&props.topic!=="T"}>
                            {props.topic!=="IEQ"&&props.topic!=="Temp"&&props.topic!=="RH"&&props.topic!=="T" ? null : /*iframes["RH"][props.timeWindow]*/
                                <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>RH</p>{props.RTValues["RH"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("RH")}/>
                        </div>
                        <div className="hidden" style={{height:"120px", borderColor:"#fff"}} hidden={props.topic==="IEQ"||props.topic==="Temp"||props.topic==="T"||props.topic==="RH"}/>
                        <div className="row" style={{height: "50%"}}>
                            <div className="holderGauge" id="gaugeTemp" style={{opacity : props.topic==="IEQ"||props.topic==="Temp"||props.topic==="init"?1:0.2}}>
                                {iframes["Temp"][props.timeWindow]}
                                <div className="overlay" style={{position: "absolute"}}
                                     onClick={() => props.setTopic("Temp")}>
                                    <img id="imgTemp" src={temp} alt="temp"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{height: "33%"}}/>
                <div className="row" style={{height: "33%"}}>
                    <div className="col-6">
                        <div className="row" style={{height: "50%"}}/>
                        <div className="holder" style={{borderColor: "rgb(132,151,131)", opacity : props.topic==="IEQ"||props.topic==="SPL"?1:0.2}}
                             hidden={props.topic!=="IEQ"&&props.topic!=="Sound"&&props.topic!=="SPL"}>
                            {
                                props.topic!=="IEQ"&&props.topic!=="Sound"&&props.topic!=="SPL"? null: /*iframes["SPL"][props.timeWindow]*/
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>SPL</p>{props.RTValues["SPL"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("SPL")}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row" style={{height: "50%"}}>
                            <div className="holderGauge" id="gaugeSound" style={{opacity : props.topic==="init"||props.topic==="IEQ"||props.topic==="Sound"?1:0.2}} >
                                {iframes["Sound"][props.timeWindow]}
                                <div className="overlay" style={{position: "absolute"}}
                                     onClick={() => props.setTopic("Sound")}>
                                    <img id="imgSound" src={sound} alt="sound"/>
                                </div>
                            </div>
                        </div>
                        <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : props.topic==="IEQ"||props.topic==="VOC"?1:0.2}}
                             hidden={props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"}>
                            {
                                props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"?
                                    null : /*iframes["VOC"][props.timeWindow]*/
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>VOC</p>{props.RTValues["VOC"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("VOC")}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="row" style={{height: "33%"}}/>
                <div className="row" style={{height: "33%"}}>
                    <div className="holderGauge"  style={{zIndex:0, opacity : props.topic==="init"||props.topic==="IEQ"?1:0.2}}>
                        {iframes["IEQ"][props.timeWindow]}
                        <div className="overlay" style={{position: "absolute"}}
                             onClick={() => props.setTopic("IEQ")}>
                            <img id="imgIEQ" src={IEQ} alt="IEQ"/>
                        </div>
                    </div>
                </div>
                <div className="row" style={{height: "33%"}}>
                    <div className="col-6">
                        <div className="row" style={{height: "50%"}}/>
                        <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : props.topic==="IEQ"||props.topic==="CH2O"?1:0.2}}
                             hidden={props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"}>
                            {
                                props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"?
                                    null : /*iframes["CH2O"][props.timeWindow]*/
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>CH<sub>2</sub>O</p>{props.RTValues["CH2O"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("CH2O")}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row" style={{height: "50%"}}/>
                        <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : props.topic==="IEQ"||props.topic==="CO2"?1:0.2}}
                             hidden={props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"}>
                            {
                                props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"?
                                    null: /*iframes["CO2"][props.timeWindow]*/
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>CO<sub>2</sub></p>{props.RTValues["CO2"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("CO2")}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="row" style={{height: "33%"}}>
                    <div className="col-6">
                        <div className="holder" style={{borderColor: "rgb(236, 203, 123)", opacity : props.topic==="IEQ"||props.topic==="E"?1:0.2}}
                             hidden={props.topic!=="IEQ"&&props.topic!=="Light"&&props.topic!=="E"}>
                            {
                                props.topic!=="IEQ"&&props.topic!=="Light"&&props.topic!=="E"?
                                    null : /*iframes["E"][props.timeWindow]*/
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>E</p>{props.RTValues["E"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("E")}/>
                        </div>
                        <div className="hidden" style={{height:"120px", borderColor:"#fff"}} hidden={props.topic==="IEQ"||props.topic==="Light"||props.topic==="E"}/>
                        <div className="row" style={{height: "50%"}}>
                            <div id="gaugeLight" className="holderGauge" style={{opacity : props.topic==="init"||props.topic==="IEQ"||props.topic==="Light"?1:0.2}}>
                                {iframes["Light"][props.timeWindow]}
                                <div className="overlay" style={{position: "absolute"}}
                                     onClick={() => props.setTopic("Light")}>
                                    <img id="imgLight" src={light} alt="light"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6"/>
                </div>
                <div className="row" style={{height: "33%"}}>
                    <div className="col-6"/>
                    <div className="col-6">
                        <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : props.topic==="IEQ"||props.topic==="PM2.5"?1:0.2}}
                             hidden={props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"}>
                            {
                                props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"?
                                    null : /*iframes["PM2.5"][props.timeWindow]*/
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"3px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>PM2.5</p>{props.RTValues["PM2.5"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("PM2.5")}/>
                        </div>
                        <div className="row" style={{height:"40px"}}/>
                        <div id="PM10" className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : props.topic==="IEQ"||props.topic==="PM10"?1:0.2}}
                             hidden={props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"}>
                            {
                                props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"?
                                    null :
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"3px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>PM10</p>{props.RTValues["PM10"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("PM10")}/>
                        </div>
                    </div>
                </div>
                <div className="row" style={{height: "33%"}}>
                    <div className="col-6">
                        <div className="row" style={{height: "50%"}}>
                            <div className="holderGauge" id="gaugeAir" style={{zIndex:1, opacity : props.topic==="init"||props.topic==="IEQ"||props.topic==="Air"?1:0.2}}>
                                {iframes["Air"][props.timeWindow]}
                                <div className="overlay" style={{position: "absolute"}}
                                     onClick={() => props.setTopic("Air")}>
                                    <img id="imgAir" src={air} alt="air"/>
                                </div>
                            </div>
                        </div>
                        <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : props.topic==="IEQ"||props.topic==="CO"?1:0.2}}
                             hidden={props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"}>
                            {
                                props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"?
                                    null :
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>CO</p>{props.RTValues["CO"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("CO")}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row" style={{height:"50%"}}/>
                        <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : props.topic==="IEQ"||props.topic==="NO2"?1:0.2}}
                             hidden={props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"}>
                            {
                                props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"?
                                    null :
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>NO<sub>2</sub></p>{props.RTValues["NO2"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("NO2")}/>
                        </div>
                        <div className="row" style={{height: "50%"}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}