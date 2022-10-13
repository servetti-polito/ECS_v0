import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/dashboard.css'
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import template from "./resources/GrafanaReqTemplate.json";
import air from "./resources/images/air.png";
import temp from "./resources/images/temp.png";
import light from "./resources/images/light.png";
import IEQ from "./resources/images/ieq.png";
import sound from "./resources/images/sound.png";
import dashLogo from "./resources/images/logo.png";
import explain from "./resources/descriptions.json";
import titles from "./resources/titles.json";
import measures from "./resources/measures.json";
import refValues from "./resources/referenceValues.json";
import hints from "./resources/hints.json";
import more from "./resources/more.json";
import laws from "./resources/laws.json";

export default function Dashboard(props) {

    let [showGraph, setShowGraph] = useState(false)
    let [compareGraph, setCompareGraph] = useState (false)
    let [timeWindow, setTimeWindow] = useState("RT")
    let [topic, setTopic] = useState("init")
    let [RTValues, setRTValues] = useState({
        RH:"...",
        T:"...",
        Temp:"",
        Air:"",
        Sound:"",
        Light:"",
        IEQ:"",
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
    let [compareTopics, setCompareTopics] = useState([]);
    let [disableTopics, setDisableTopics] = useState(false);
    let [compareTime, setCompareTime] = useState([]);
    let [disableTime, setDisableTime] = useState(false);

    let navigate = useNavigate();
    const toggleGraph = () => {
        if(showGraph) {
            setCompareGraph(false)
            setCompareTopics([]);
            setCompareTime([]);
            setDisableTime(false);
            setDisableTopics(false)
        }
        setShowGraph(!showGraph);
    }
    const toggleCompare = () => {
        if(!compareGraph) {
            setDisableTopics(false)
            setDisableTime(false)
            setCompareTime([timeWindow])
            setCompareTopics([topic==="init"?"IEQ":topic])
        }
        setCompareGraph(!compareGraph);
    }
    const addCompareTopic = (newTopic) =>{
        let tempTopics = compareTopics
        if(tempTopics.includes(newTopic))
        {
            let index = tempTopics.indexOf(newTopic);
            console.log(index, tempTopics[index])
            if (index > -1 && tempTopics.length>1)
                tempTopics.splice(index, 1);
            if(tempTopics.length<4)
                setDisableTopics(false);
            if(tempTopics.length<2)
                setDisableTime(false);
        }
        else
        {
            tempTopics.push(newTopic)
            if(tempTopics.length>=2)
                setDisableTime(true);
            if(tempTopics.length>=4)
                setDisableTopics(true);
        }
        setCompareTopics([...tempTopics])
    }
    const addCompareTime = (newTime) => {
        let tempTime = compareTime;
        if(tempTime.includes(newTime))
        {
            let index = tempTime.indexOf(newTime);
            console.log(index, tempTime[index])
            if (index > -1 && tempTime.length>1)
                tempTime.splice(index, 1);
            if(tempTime.length<4)
                setDisableTime(false);
            if(tempTime.length<2)
                setDisableTopics(false);
        }
    else
        {
            tempTime.push(newTime)
            if(tempTime.length>=4)
                setDisableTime(true);
            if(tempTime.length>=2)
                setDisableTopics(true);
        }
        setCompareTime([...tempTime])
    }

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
                        {
                            compareGraph ?
                                <div className="row" style={{marginTop:"10%"}}>
                                    <div className="col-6" style={{textAlign:"center"}}>
                                        <button type="button" onClick={()=>{addCompareTopic("IEQ")}} disabled={compareTopics.includes("IEQ") ? false : disableTopics} className={compareTopics.includes("IEQ")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>IEQ</button>
                                        <button type="button" onClick={()=>{addCompareTopic("Temp")}} disabled={compareTopics.includes("Temp") ? false : disableTopics} className={compareTopics.includes("Temp")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>{props.ita ? "Comfort Termico" : "Thermal Comfort"}</button>
                                        <button type="button" onClick={()=>{addCompareTopic("Air")}} disabled={compareTopics.includes("Air") ? false : disableTopics} className={compareTopics.includes("Air")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>{props.ita ? "Qualità dell'aria" : "Indoor Air Quality"}</button>
                                        <button type="button" onClick={()=>{addCompareTopic("Light")}} disabled={compareTopics.includes("Light") ? false : disableTopics} className={compareTopics.includes("Light")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>{props.ita ? "Comfort Visivo" : "Visual Comfort"}</button>
                                        <button type="button" onClick={()=>{addCompareTopic("Sound")}} disabled={compareTopics.includes("Sound") ? false : disableTopics} className={compareTopics.includes("Sound")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>{props.ita ? "Comfort Acustico" : "Acoustic Comfort"}</button>
                                        <button type="button" onClick={()=>{addCompareTopic("T")}} disabled={compareTopics.includes("T") ? false : disableTopics} className={compareTopics.includes("T")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>T<sub>a</sub></button>
                                        <button type="button" onClick={()=>{addCompareTopic("RH")}} disabled={compareTopics.includes("RH") ? false : disableTopics} className={compareTopics.includes("RH")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>RH</button>
                                        <button type="button" onClick={()=>{addCompareTopic("SPL")}} disabled={compareTopics.includes("SPL") ? false : disableTopics} className={compareTopics.includes("SPL")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>SPL</button>
                                    </div>
                                    <div className="col-6" style={{textAlign:"center"}}>
                                        <button type="button" onClick={()=>{addCompareTopic("E")}} disabled={compareTopics.includes("E") ? false : disableTopics} className={compareTopics.includes("E")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>E</button>
                                        <button type="button" onClick={()=>{addCompareTopic("NO2")}} disabled={compareTopics.includes("NO2") ? false : disableTopics} className={compareTopics.includes("NO2")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>NO<sub>2</sub></button>
                                        <button type="button" onClick={()=>{addCompareTopic("VOC")}} disabled={compareTopics.includes("VOC") ? false : disableTopics} className={compareTopics.includes("VOC")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>VOC</button>
                                        <button type="button" onClick={()=>{addCompareTopic("CH2O")}} disabled={compareTopics.includes("CH2O") ? false : disableTopics} className={compareTopics.includes("CH2O")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>CH<sub>2</sub>O</button>
                                        <button type="button" onClick={()=>{addCompareTopic("CO")}} disabled={compareTopics.includes("CO") ? false : disableTopics} className={compareTopics.includes("CO")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>CO</button>
                                        <button type="button" onClick={()=>{addCompareTopic("CO2")}} disabled={compareTopics.includes("CO2") ? false : disableTopics} className={compareTopics.includes("CO2")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>CO<sub>2</sub></button>
                                        <button type="button" onClick={()=>{addCompareTopic("PM2.5")}} disabled={compareTopics.includes("PM2.5") ? false : disableTopics} className={compareTopics.includes("PM2.5")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>PM2.5</button>
                                        <button type="button" onClick={()=>{addCompareTopic("PM10")}} disabled={compareTopics.includes("PM10") ? false : disableTopics} className={compareTopics.includes("PM10")?"btn btn-primary btn-topic":"btn btn-white-border btn-topic"}>PM10</button>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className="row">
                                        <h2 id="dashTitle" style={{textAlign: "center", paddingTop: "50px"}}>{titles[topic==="init"?"IEQ":topic][props.ita?"it":"en"]}</h2>
                                    </div>
                                    <div className="row">
                                        <h5 id="dashExplain" style={{textAlign: "center", padding: "20px"}}>{explain[topic==="init"?"IEQ":topic][props.ita?"it":"en"]}</h5>
                                    </div>
                                </>
                        }
                        {showGraph ? null : <Compliances topic={topic} timeWindow={timeWindow} ita={props.ita}/>}
                        <div className="row" style={{position:"fixed", bottom:"20px", width:"34%"}}>
                            <div className="row justify-content-center">
                                <button style={{fontSize: "150% !important", "width": "75%", "color": "#FF9724"}} className="btn btn-white btn-compliances" type="button" onClick={toggleGraph}>{showGraph ? props.ita?"Nascondi il grafico":"Hide the graph" : props.ita?"Mostra il grafico":"Show the graph"}</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div style={{margin: "3.5%"}}/>
                            <div className="row" style={{width: "93%"}}>
                                <div className="col" id="timecol">
                                    <button id="timeButton" disabled={compareGraph&&disableTime&&!compareTime.includes("RT")} className={(!compareGraph && timeWindow === "RT") || (compareGraph && compareTime.includes("RT")) ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {if(compareGraph) addCompareTime("RT"); else setTimeWindow("RT");}}>RT</button>
                                </div>
                                <div className="col" id="timecol">
                                    <button id="timeButton" disabled={compareGraph&&disableTime&&!compareTime.includes("3H")} className={(!compareGraph && timeWindow === "3H")|| (compareGraph && compareTime.includes("3H")) ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {if(compareGraph) addCompareTime("3H"); else setTimeWindow("3H");}}>3h</button>
                                </div>
                                <div className="col" id="timecol">
                                    <button id="timeButton" disabled={compareGraph&&disableTime&&!compareTime.includes("12H")} className={(!compareGraph && timeWindow === "12H") || (compareGraph && compareTime.includes("12H")) ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {if(compareGraph) addCompareTime("12H"); else setTimeWindow("12H")}}>12h</button>
                                </div>
                                <div className="col" id="timecol">
                                    <button id="timeButton" disabled={compareGraph&&disableTime&&!compareTime.includes("24H")} className={(!compareGraph && timeWindow === "24H") || (compareGraph && compareTime.includes("24H")) ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {if(compareGraph) addCompareTime("24H"); else setTimeWindow("24H")}}>24h</button>
                                </div>
                                <div className="col" id="timecol">
                                    <button id="timeButton" disabled={compareGraph&&disableTime&&!compareTime.includes("3D")} className={(!compareGraph && timeWindow === "3D") || (compareGraph && compareTime.includes("3D")) ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {if(compareGraph) addCompareTime("3D"); else setTimeWindow("3D")}}>3d</button>
                                </div>
                                <div className="col" id="timecol">
                                    <button id="timeButton" disabled={compareGraph&&disableTime&&!compareTime.includes("1W")} className={(!compareGraph && timeWindow === "1W") || (compareGraph && compareTime.includes("1W")) ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {if(compareGraph) addCompareTime("1W"); else setTimeWindow("1W")}}>1w</button>
                                </div>
                                <div className="col" id="timecol">
                                    <button id="timeButton" disabled={compareGraph&&disableTime&&!compareTime.includes("1M")} className={(!compareGraph && timeWindow === "1M")|| (compareGraph && compareTime.includes("1M")) ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {if(compareGraph) addCompareTime("1M"); else setTimeWindow("1M")}}>1m</button>
                                </div>
                            </div>
                        <div style={{margin:"5%"}}/>
                        <div id="graphBox" style={{height: "70%", marginTop: "25px", marginBottom: "25px"}}>
                                    {showGraph ?
                                        compareGraph ?
                                            <CompareGraphs compareTopics={compareTopics} compareTime={compareTime}/>
                                            :
                                            <DashGraphs timeWindow={timeWindow} topic={topic}/>
                                        :
                                        <DashIframes timeWindow={timeWindow} topic={topic} setTopic={setTopic} RTValues={RTValues}/>
                                    }
                        </div>
                        <div>
                            {
                                showGraph ? <Legenda ita={props.ita} topic={topic} compareTopics={compareTopics}/> : <HintsMore topic={topic} ita={props.ita}/>
                            }
                        </div>
                    </div>
                    <div className="row" style={{position:"fixed", bottom:"20px", right:"2%",width:"25%"}}>
                        <button hidden={!showGraph} className={compareGraph?"btn btn-primary btn-compliances":"btn btn-white-border btn-compliances"} type="button" onClick={toggleCompare}>{props.ita ? "Confronta i grafici" : "Compare the graphs"}</button>
                    </div>
                </div>
            </div>
        );

    function Compliances () {
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
                            let updatedValue = {[t==="Ta"?"T":t]:parseFloat(result["results"][t]["frames"][0]["data"]["values"][1][0]).toFixed(0)+" "+measures[t==="Ta"?"T":t]}
                            setRTValues(rtv => ({
                                ...rtv,
                                ...updatedValue
                            }))
                        }
                    }
                    else if (this.readyState === 4 && this.status !== 200)
                    {}
                };
                xhttp.open("POST", "https://dev.prometeo.click/chart/api/ds/query", true);
                xhttp.setRequestHeader("Content-Type","application/json")
                xhttp.setRequestHeader("Host","dev.prometeo.click",)
                xhttp.send(JSON.stringify(template));
            },5000)
            return ()=>clearInterval(APIcall);
        },[])

        return (
            <>
                {
                    compareGraph ? null :
                    <div style={{position:"fixed", bottom:"10%", width:"31%"}}>
                        <div style={{background:"#fff", borderRadius:"20px", height:"30vh", padding:20}}>
                            <div className="row">
                            {
                                topic!=="init"&&topic!=="IEQ"&&topic!=="Air"&&topic!=="Temp"&&topic!=="Light"&&topic!=="Sound" ?
                                    <div className="text-center">
                                    <h4 id="compliance" style={{textAlign: "center", textDecoration:"underline", margin:0}}>{props.ita?"Valori di riferimento: ":"Reference values: "}{refValues[topic==="init"?"IEQ":topic]}</h4>
                                    <p style={{marginBottom:20}}>({laws[topic]})</p>
                                    </div>: null
                            }
                            </div>
                            <div className="row" id="compliances">
                                {timeWindow==="RT" ?
                                        <h4 id="compliance" style={{textAlign: "center"}}>{props.ita?"Valore in tempo reale: ":"Real-time value: "}{RTValues[topic==="init"?"IEQ":topic]}</h4> :
                                        props.ita?
                                            <h4 id="compliance" style={{textAlign: "center"}}>Media: ...<br/>Deviazione Standard: ...<br/>10° Percentile: ...<br/>90° Percentile: ...</h4> :
                                            <h4 id="compliance" style={{textAlign: "center"}}>Mean Value: ...<br/>Standard Deviation: ...<br/>10th Percentile: ...<br/>90th Percentile: ...</h4>
                                }
                            </div>
                        </div>
                    </div>
                }
                </>
        )
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
            {/*<div className="col-5" style={{backgroundColor: "white", borderRadius: "10px", marginRight: "2.5%", marginLeft: "5%"}}>*/}
            <div className="col-6" style={{padding:2.5, backgroundColor:"white"}}>
                <p id="clock" style={{textAlign: "center", margin: "0px", letterSpacing: "-1px", color: "#FF9724"}}>{date}</p>
            </div>
            {/*<div className="col-5" style={{backgroundColor: "white", borderRadius: "10px", marginLeft: "2.5%", marginRight: "5%"}}>*/}
            <div className="col-6" style={{padding:2.5, backgroundColor:"white"}} >
                <p id="clock" style={{textAlign: "center", margin: "0px", color: "#FF9724"}}>{time}</p>
            </div>
        </div>
    )
}
function DashGraphs(props) {
        return(
            <div className="container" style={{height:"100%"}}>
                {iframes[props.topic==="init"?"IEQ":props.topic][props.timeWindow]}
            </div>
        )

}
function CompareGraphs(props) {
    let graphs = [];
    for(let i=0; i<props.compareTopics.length; i++)
        for(let j=0; j<props.compareTime.length; j++)
        {
            graphs.push(iframes[props.compareTopics[i]][props.compareTime[j]])
        }
    return (
    <div className="row" style={{height:"100%"}}>
        <div className="row">
            <div className="col-6" >
                {graphs.length>=1 ? graphs[0] : null}
            </div>
            <div className="col-6" >
                {graphs.length>=2 ? graphs[1] : null}
            </div>
        </div>
        <div className="row">
            <div className="col-6" >
                {graphs.length>=3 ? graphs[2] : null}
            </div>
            <div className="col-6" >
                {graphs.length>=4 ? graphs[3] : null}
            </div>
        </div>
    </div>)
}
function DashIframes(props) {
    const gauges = {
        "Temp":{
            "RT": <iframe title="TempRT" id="dashGauge"  src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;panelId=19" frameBorder="0"/>,
            "3H": <iframe title="Temp3H" id="dashGauge"  src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;panelId=19" frameBorder="0"/>,
            "12H": <iframe title="Temp12H" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;panelId=19" frameBorder="0"/>,
            "24H": <iframe title="Temp24H" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;panelId=19" frameBorder="0"/>,
            "3D": <iframe title="Temp3D" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;panelId=19" frameBorder="0"/>,
            "1W": <iframe title="Temp1W" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;panelId=19" frameBorder="0"/>,
            "1M": <iframe title="Temp1M" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;panelId=19" frameBorder="0"/>
        },
        "Sound":{
            "RT": <iframe title="SoundRT" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=18" frameBorder="0"/>,
            "3H": <iframe title="Sound3H" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=18" frameBorder="0"/>,
            "12H": <iframe title="Sound12H" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=18" frameBorder="0"/>,
            "24H": <iframe title="Sound24H" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=18" frameBorder="0"/>,
            "3D": <iframe title="Sound3D" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=18" frameBorder="0"/>,
            "1W": <iframe title="Sound1W" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=18" frameBorder="0"/>,
            "1M": <iframe title="Sound1M" id="dashGauge" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=18" frameBorder="0"/>
        },
        "IEQ":{
            "RT": <iframe id="dashIEQ" title="IEQRT" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=21" frameBorder="0"/>,
            "3H": <iframe id="dashIEQ" title="IEQ3H" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=21" frameBorder="0"/>,
            "12H": <iframe id="dashIEQ" title="IEQ12H" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=21" frameBorder="0"/>,
            "24H": <iframe id="dashIEQ" title="IEQ24H" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=21" frameBorder="0"/>,
            "3D": <iframe id="dashIEQ" title="IEQ3D" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=21" frameBorder="0"/>,
            "1W": <iframe id="dashIEQ" title="IEQ1W" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=21" frameBorder="0"/>,
            "1M": <iframe id="dashIEQ" title="IEQ1M" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=21" frameBorder="0"/>
        },
        "Light":{
            "RT": <iframe id="dashGauge" title="LightRT" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=20" frameBorder="0"/>,
            "3H": <iframe id="dashGauge" title="Light3H" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=20" frameBorder="0"/>,
            "12H": <iframe id="dashGauge" title="Light12H" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=20" frameBorder="0"/>,
            "24H": <iframe id="dashGauge" title="Light24H" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=20" frameBorder="0"/>,
            "3D": <iframe id="dashGauge" title="Light3D" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=20" frameBorder="0"/>,
            "1W": <iframe id="dashGauge" title="Light1W" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=20" frameBorder="0"/>,
            "1M": <iframe id="dashGauge" title="Light1M" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=20" frameBorder="0"/>
        },
        "Air":{
            "RT": <iframe id="dashGauge" title="AirRT" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=6" frameBorder="0"/>,
            "3H": <iframe id="dashGauge" title="Air3H" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=6" frameBorder="0"/>,
            "12H": <iframe id="dashGauge" title="Air12H" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=6" frameBorder="0"/>,
            "24H": <iframe id="dashGauge" title="Air24H" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=6" frameBorder="0"/>,
            "3D": <iframe id="dashGauge" title="Air3D" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=6" frameBorder="0"/>,
            "1W": <iframe id="dashGauge" title="Air1W" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=6" frameBorder="0"/>,
            "1M": <iframe id="dashGauge" title="Air1M" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;panelId=6" frameBorder="0"/>
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
                            {props.topic!=="IEQ"&&props.topic!=="Temp"&&props.topic!=="RH"&&props.topic!=="T" ? null :
                                <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>RH</p>{props.RTValues["RH"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("RH")}/>
                        </div>
                        <div className="hidden" style={{height:"120px", borderColor:"#fff"}} hidden={props.topic==="IEQ"||props.topic==="Temp"||props.topic==="T"||props.topic==="RH"}/>
                        <div className="row" style={{height: "50%"}}>
                            <div className="holderGauge" id="gaugeTemp" style={{opacity : props.topic==="IEQ"||props.topic==="Temp"||props.topic==="init"?1:0.2}}>
                                {gauges["Temp"][props.timeWindow]}
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
                                props.topic!=="IEQ"&&props.topic!=="Sound"&&props.topic!=="SPL"? null:
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>SPL</p>{props.RTValues["SPL"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("SPL")}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row" style={{height: "50%"}}>
                            <div className="holderGauge" id="gaugeSound" style={{opacity : props.topic==="init"||props.topic==="IEQ"||props.topic==="Sound"?1:0.2}} >
                                {gauges["Sound"][props.timeWindow]}
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
                                    null :
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>VOC</p>{props.RTValues["VOC"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("VOC")}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="row" style={{height: "33%"}}>
                    <div className="holderGauge"  style={{zIndex:0, opacity : props.topic==="init"||props.topic==="IEQ"?1:0.2}}>
                        {gauges["IEQ"][props.timeWindow]}
                        <div className="overlay" style={{position: "absolute"}}
                             onClick={() => props.setTopic("IEQ")}>
                            <img id="imgIEQ" src={IEQ} alt="IEQ"/>
                        </div>
                    </div>
                </div>
                <div className="row text-center" style={{height: "33%", position:"relative"}}>
                    <img id="dashLogo" src={dashLogo} alt="logo"/>
                </div>
                <div className="row" style={{height: "33%"}}>
                    <div className="col-6">
                        <div className="row" style={{height: "50%"}}/>
                        <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : props.topic==="IEQ"||props.topic==="CH2O"?1:0.2}}
                             hidden={props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"}>
                            {
                                props.topic!=="IEQ"&&props.topic!=="Air"&&props.topic!=="VOC"&&props.topic!=="CH2O"&&props.topic!=="CO2"&&props.topic!=="CO"&&props.topic!=="NO2"&&props.topic!=="PM2.5"&&props.topic!=="PM10"?
                                    null :
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
                                    null:
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
                                    null :
                                    <div style={{fontSize:"100%", textAlign:"center", position:"absolute", top:"-2px"}}><p style={{margin:"0px", fontSize:"125%", fontWeight:"bold"}}>E</p>{props.RTValues["E"]}</div>
                            }
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => props.setTopic("E")}/>
                        </div>
                        <div className="hidden" style={{height:"120px", borderColor:"#fff"}} hidden={props.topic==="IEQ"||props.topic==="Light"||props.topic==="E"}/>
                        <div className="row" style={{height: "50%"}}>
                            <div id="gaugeLight" className="holderGauge" style={{opacity : props.topic==="init"||props.topic==="IEQ"||props.topic==="Light"?1:0.2}}>
                                {gauges["Light"][props.timeWindow]}
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
                                    null :
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
                                {gauges["Air"][props.timeWindow]}
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
function Legenda (props) {
    return(
        <div id="legenda" style={{paddingLeft:50}}>
            <div className="row">
                <div className="col-1 text-center" style={{padding:0}}>
                    <div style={{marginLeft:20, height:30, width:30, borderRadius:"50%", backgroundColor:"rgb(255,217,102)"}}/>
                </div>
                <div className="col" style={{lineHeight:1.5}}>
                    {props.ita ? "Comfort soggettivo":"Subjective comfort"}
                </div>
            </div>
            <div className="row">
                <div className="col-1 text-center" style={{padding:0}}>
                    <div style={{height:30, width:70, backgroundColor:"rgb(228,242,227)"}}/>
                </div>
                <div className="col">
                    {props.ita ? "Range di riferimento":"Reference range"}
                </div>
            </div>
        </div>
    )
}
function HintsMore(props){
    let topic=props.topic==="init"?"IEQ":props.topic
    const [hint, setHint] = useState("")
    //HINTS///////////////////////////////////////////////////////
    const [showHints, setShowHints] = useState(false);
    const handleCloseHints = () => setShowHints(false);
    const handleShowHints = () => {
        let random = Math.floor(Math.random() * (hints[topic].length))
        setHint(hints[topic][random][props.ita?"it":"en"]);
        setShowHints(true);
    }
    //MORE////////////////////////////////////////////////////////
    const [showMore, setShowMore] = useState(false);
    const handleCloseMore = () => setShowMore(false);
    const handleShowMore = () => setShowMore(true);
    return (
        <div className="row" id="hintsmore">
            <div className="col-6 text-end">
                <button className={showHints?"btn btn-primary btn-hintsmore":"btn btn-white-border btn-hintsmore"} onClick={handleShowHints}>Hints</button>
            </div>
            <div className="col-6">
                <button className={showMore?"btn btn-primary btn-hintsmore":"btn btn-white-border btn-hintsmore"} onClick={handleShowMore}>More</button>
            </div>
            <Modal id="HintsModal" show={showHints} onHide={handleCloseHints}>
                <Modal.Body style={{position:"relative", overflowY:"hidden"}}>
                    <Modal.Title style={{color:"#ff9724", textAlign:"center"}}>Hints</Modal.Title>
                    <div style={{overflowY:"scroll", height:"30vh"}}>
                        {hint}
                    </div>
                    <Modal.Footer>
                        <div className="text-center" style={{width:"100%"}}>
                        <button className="btn btn-modalclose" onClick={handleCloseHints}>Back</button>
                        </div>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
            <Modal id="MoreModal" show={showMore} onHide={handleCloseMore}>
                <Modal.Body style={{position:"relative", overflowY:"hidden"}}>
                    <Modal.Title style={{color:"#ff9724", textAlign:"center"}}>More</Modal.Title>
                    <div style={{overflowY:"scroll", height:"30vh"}}>
                        {more[topic][props.ita?"it":"en"]}
                    </div>
                    <Modal.Footer>
                        <div className="text-center" style={{width:"100%"}}>
                            <button className="btn btn-modalclose" onClick={handleCloseMore}>Back</button>
                        </div>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div>
    )
}
const iframes = {
    "Temp": {
        "RT": <iframe title="TempRT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=23&refresh=5s"  frameBorder="0"/>,
        "3H": <iframe title="Temp3H"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=27"  frameBorder="0"/>,
        "12H": <iframe title="Temp12H"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=27"  frameBorder="0"/>,
        "24H": <iframe title="Temp24H"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=27"  frameBorder="0"/>,
        "3D": <iframe title="Temp3D"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=27"  frameBorder="0"/>,
        "1W": <iframe title="Temp1W"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=27"  frameBorder="0"/>,
        "1M": <iframe title="Temp1M"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=27"  frameBorder="0"/>
    },
    "T": {
        "RT": <iframe title="TRT"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=30&refresh=5s" frameBorder="0"/>,
        "3H": <iframe title="T3H"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=31"  frameBorder="0"/>,
        "12H": <iframe title="T12H"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=31"  frameBorder="0"/>,
        "24H": <iframe title="T24H"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=31"  frameBorder="0"/>,
        "3D": <iframe title="T3D"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=31"  frameBorder="0"/>,
        "1W": <iframe title="T1W"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=31"  frameBorder="0"/>,
        "1M": <iframe title="T1M"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=31"  frameBorder="0"/>
    },
    "RH": {
        "RT": <iframe title="RHRT"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=32&refresh=5s"  frameBorder="0"/>,
        "3H": <iframe title="RH3H"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=33"  frameBorder="0"/>,
        "12H": <iframe title="RH12H"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=33"  frameBorder="0"/>,
        "24H": <iframe title="RH24H"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=33"  frameBorder="0"/>,
        "3D": <iframe title="RH3D"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=33"  frameBorder="0"/>,
        "1W": <iframe title="RH1W"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=33"  frameBorder="0"/>,
        "1M": <iframe title="RH1M"  id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=33"  frameBorder="0"/>
    },
    "Light": {
        "RT":<iframe title="LightRT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24&refresh=5s"  frameBorder="0"/>,
        "3H":<iframe title="Light3H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
        "12H":<iframe title="Light12H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
        "24H":<iframe title="Light24H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
        "3D":<iframe title="Light3D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
        "1W":<iframe title="Light1W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
        "1M":<iframe title="Light1M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
    },
    "E": {
        "RT":<iframe title="ERT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24&refresh=5s"  frameBorder="0"/>,
        "3H":<iframe title="E3H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
        "12H":<iframe title="E12H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
        "24H":<iframe title="E24H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
        "3D":<iframe title="E3D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
        "1W":<iframe title="E1W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
        "1M":<iframe title="E1M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=24"  frameBorder="0"/>,
    },
    "Sound": {
        "RT":<iframe title="SoundRT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26&refresh=5s"  frameBorder="0"/>,
        "3H":<iframe title="Sound3H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
        "12H":<iframe title="Sound12H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
        "24H":<iframe title="Sound24H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
        "3D":<iframe title="Sound3D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
        "1W":<iframe title="Sound1W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
        "1M":<iframe title="Sound1M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
    },
    "SPL": {
        "RT":<iframe title="SPLRT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26&refresh=5s"  frameBorder="0"/>,
        "3H":<iframe title="SPL3H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
        "12H":<iframe title="SPL12H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
        "24H":<iframe title="SPL24H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
        "3D":<iframe title="SPL3D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
        "1W":<iframe title="SPL1W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
        "1M":<iframe title="SPL1M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=26"  frameBorder="0"/>,
    },
    "Air": {
        "RT" : <iframe title="AirRT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25&refresh=5s"  frameBorder="0"/>,
        "3H" : <iframe title="Air3H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "12H" : <iframe title="Air12H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "24H" : <iframe title="Air24H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "3D" : <iframe title="Air3D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1W" : <iframe title="Air1W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1M" : <iframe title="Air1M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
    },
    "PM2.5": {
        "RT" : <iframe title="PM2.5RT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25&refresh=5s"  frameBorder="0"/>,
        "3H" : <iframe title="PM2.53H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "12H" : <iframe title="PM2.512H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "24H" : <iframe title="PM2.524H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "3D" : <iframe title="PM2.53D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1W" : <iframe title="PM2.51W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1M" : <iframe title="PM2.51M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
    },
    "PM10": {
        "RT" : <iframe title="PM10RT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25&refresh=5s"  frameBorder="0"/>,
        "3H" : <iframe title="PM103H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "12H" : <iframe title="PM1012H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "24H" : <iframe title="PM1024H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "3D" : <iframe title="PM103D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1W" : <iframe title="PM101W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1M" : <iframe title="PM101M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
    },
    "NO2": {
        "RT" : <iframe title="NO2RT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25&refresh=5s"  frameBorder="0"/>,
        "3H" : <iframe title="NO23H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "12H" : <iframe title="NO212H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "24H" : <iframe title="NO224H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "3D" : <iframe title="NO23D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1W" : <iframe title="NO21W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1M" : <iframe title="NO21M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
    },
    "CO": {
        "RT" : <iframe title="CORT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25&refresh=5s"  frameBorder="0"/>,
        "3H" : <iframe title="CO3H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "12H" : <iframe title="CO12H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "24H" : <iframe title="CO24H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "3D" : <iframe title="CO3D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1W" : <iframe title="CO1W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1M" : <iframe title="CO1M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
    },
    "CO2": {
        "RT" : <iframe title="CO2RT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25&refresh=5s"  frameBorder="0"/>,
        "3H" : <iframe title="CO23H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "12H" : <iframe title="CO212H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "24H" : <iframe title="CO224H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "3D" : <iframe title="CO23D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1W" : <iframe title="CO21W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1M" : <iframe title="CO21M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
    },
    "CH2O": {
        "RT" : <iframe title="CH2ORT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25&refresh=5s"  frameBorder="0"/>,
        "3H" : <iframe title="CH2O3H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "12H" : <iframe title="CH2O12H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "24H" : <iframe title="CH2O24H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "3D" : <iframe title="CH2O3D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1W" : <iframe title="CH2O1W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1M" : <iframe title="CH2O1M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
    },
    "VOC": {
        "RT" : <iframe title="VOCRT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25&refresh=5s"  frameBorder="0"/>,
        "3H" : <iframe title="VOC3H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "12H" : <iframe title="VOC12H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "24H" : <iframe title="VOC24H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "3D" : <iframe title="VOC3D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1W" : <iframe title="VOC1W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
        "1M" : <iframe title="VOC1M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=25"  frameBorder="0"/>,
    },
    "IEQ": {
        "RT" : <iframe title="IEQRT" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=34&refresh=5s"  frameBorder="0"/>,
        "3H" : <iframe title="IEQ3H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=35"  frameBorder="0"/>,
        "12H" : <iframe title="IEQ12H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=35"  frameBorder="0"/>,
        "24H" : <iframe title="IEQ24H" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=35"  frameBorder="0"/>,
        "3D" : <iframe title="IEQ3D" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=35"  frameBorder="0"/>,
        "1W" : <iframe title="IEQ1W" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=35"  frameBorder="0"/>,
        "1M" : <iframe title="IEQ1M" id="dashGraph" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&panelId=35"  frameBorder="0"/>,
    }
}