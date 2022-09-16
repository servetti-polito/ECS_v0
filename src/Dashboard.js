import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/dashboard.css'
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

export default function Dashboard(props) {

    const titles = {
        "Dash": props.ita ? "Qualità dell'ambiente interno" : "Indoor Environmental Quality",
        "Air": props.ita ? "Qualità dell'aria" : "Air quality",
        "Temp": props.ita ? "Temperatura": "Temperature",
        "Light": props.ita ? "Illuminazione":"Light",
        "Sound": props.ita ? "Acustica":"Sound"
    }
    const explain = {
        "Dash": props.ita ? "Spiegazione su qualità dell'ambiente interno":"Some text about Indoor Environmental Quality",
        "Air": props.ita ? "Spiegazione su qualità dell'aria" : "Some text about Air quality",
        "Temp": props.ita ? "Spiegazione su temperatura" : "Some text about Temperature",
        "Light": props.ita ? "Spiegazione su illuminazione" : "Some text about Light",
        "Sound": props.ita? "Spiegazione su acustica" : "Some text about sound"
    }

    let [showGraph, setShowGraph] = useState(false)
    let [timeWindow, setTimeWindow] = useState("RT")
    let [topic, setTopic] = useState("Dash")

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
                    <h3 style={{textAlign: "center", margin: "5px", marginLeft: 0, letterSpacing: "-1px", color: "#FF9724"}}>{date}</h3>
                </div>
                <div className="col-5" style={{backgroundColor: "white", borderRadius: "10px", marginLeft: "2.5%", marginRight: "5%"}}>
                    <h3 style={{textAlign: "center", margin: "5px", color: "#FF9724"}}>{time}</h3>
                </div>
            </div>
        )
    }
    function Compliances () {
        let [referenceValue, setReferenceValue] = useState("...")
        let [RTValue, setRTValue] = useState("...")
        let [showCompliances, setShowCompliances] = useState(false)
        const toggleCompliance = () => {
            setShowCompliances(!showCompliances);
        }
        return (
            <>
                <div className="row">
                    <h4 style={{textAlign: "center"}}>{props.ita?"Valore di riferimento: ":"Reference value: "}{referenceValue}</h4>
                </div>
                <div className="row" id="compliances">
                    {showCompliances ?
                            props.ita?
                                <h4 style={{textAlign: "center"}}>Media: ...<br/>Deviazione Standard: ...<br/>10° Percentile: ...<br/>90° Percentile: ...</h4> :
                                <h4 style={{textAlign: "center"}}>Mean Value: ...<br/>Standard Deviation: ...<br/>10th Percentile: ...<br/>90th Percentile: ...</h4>
                        : <h4 style={{textAlign: "center"}}>{props.ita?"Valore in tempo reale: ":"Real-time value: "}{RTValue}</h4>
                    }
                </div>
                <div className="row" style={{position:"absolute", bottom:"20px", right:"20px",width:"20%"}}>
                    <button className="btn btn-white-border btn-compliances" type="button"
                            onClick={toggleCompliance}>{props.ita ? showCompliances? "Nascondi normative" : "Mostra normative" : showCompliances ? "Hide compliance" : "Show compliance"}</button>
                </div>
            </>)
    }

    let navigate = useNavigate();
    const toggleGraph = () => {
        setShowGraph(!showGraph);
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
                            <h1 style={{textAlign: "center", fontSize: "300%", marginTop: "20px", fontFamily: 'Ink Free'}}>PROMET&O</h1>
                        </div>
                        <Clock/>
                        <div className="row">
                            <h2 style={{textAlign: "center", paddingTop: "50px"}}>{titles[topic]}</h2>
                        </div>
                        <div className="row">
                            <h5 style={{textAlign: "center", padding: "20px"}}>{explain[topic]}</h5>
                        </div>
                        <Compliances/>
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
                                <button className={timeWindow === "RT" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("RT")}}>RT</button>
                            </div>
                            <div className="col">
                                <button
                                    className={timeWindow === "3H" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("3H")}}>3H
                                </button>
                            </div>
                            <div className="col">
                                <button className={timeWindow === "12H" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("12H")}}>12H</button>
                            </div>
                            <div className="col">
                                <button className={timeWindow === "24H" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("24H")}}>24H</button>
                            </div>
                            <div className="col">
                                <button className={timeWindow === "3D" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("3D")}}>3D</button>
                            </div>
                            <div className="col">
                                <button className={timeWindow === "1W" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("1W")}}>1W</button>
                            </div>
                            <div className="col">
                                <button className={timeWindow === "1M" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={() => {setTimeWindow("1M")}}>1M</button>
                            </div>
                        </div>
                        <div id="graphBox" style={{height: "70%", marginTop: "25px", marginBottom: "25px"}}>
                            {showGraph ?
                                <DashGraphs/>
                                :
                                <DashIframes/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );

    function DashIframes() {
        const IFRAMEW="120"
        const IFRAMEH="120"
        const IFRAMEW_G="250"
        const IFRAMEH_G="150"

        const iframes = {
            "T":{
                "RT":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="T" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146601379&amp;to=1663168201379&amp;panelId=7" frameBorder="0"/>,
                "3H":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="T" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146601379&amp;to=1663168201379&amp;panelId=7" frameBorder="0"/>,
                "12H":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="T" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146601379&amp;to=1663168201379&amp;panelId=7" frameBorder="0"/>,
                "24H":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="T" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146601379&amp;to=1663168201379&amp;panelId=7" frameBorder="0"/>,
                "3D":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="T" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146601379&amp;to=1663168201379&amp;panelId=7" frameBorder="0"/>,
                "1W":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="T" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146601379&amp;to=1663168201379&amp;panelId=7" frameBorder="0"/>,
                "1H":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="T" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146601379&amp;to=1663168201379&amp;panelId=7" frameBorder="0"/>,
            },
            "RH":{
                "RT":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="RH" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146185228&to=1663167785228&panelId=4" frameBorder="0"/>,
                "3H":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="RH" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146185228&to=1663167785228&panelId=4" frameBorder="0"/>,
                "12H":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="RH" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146185228&to=1663167785228&panelId=4" frameBorder="0"/>,
                "24H":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="RH" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146185228&to=1663167785228&panelId=4" frameBorder="0"/>,
                "3D":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="RH" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146185228&to=1663167785228&panelId=4" frameBorder="0"/>,
                "1W":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="RH" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146185228&to=1663167785228&panelId=4" frameBorder="0"/>,
                "1H":<iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="RH" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146185228&to=1663167785228&panelId=4" frameBorder="0"/>,
            },
            "Temp":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Temp" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19" frameBorder="0"/>
            },
            "SPL":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="SPL" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=8" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="SPL" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=8" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="SPL" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=8" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="SPL" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=8" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="SPL" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=8" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="SPL" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=8" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="SPL" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=8" frameBorder="0"/>
            },
            "Sound":{
                "RT": <iframe style={{position: "absolute"}} title="Sound" width={IFRAMEW_G} height={IFRAMEH_G} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} title="Sound" width={IFRAMEW_G} height={IFRAMEH_G} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} title="Sound" width={IFRAMEW_G} height={IFRAMEH_G} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} title="Sound" width={IFRAMEW_G} height={IFRAMEH_G} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} title="Sound" width={IFRAMEW_G} height={IFRAMEH_G} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} title="Sound" width={IFRAMEW_G} height={IFRAMEH_G} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} title="Sound" width={IFRAMEW_G} height={IFRAMEH_G} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18" frameBorder="0"/>
            },
            "VOC":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="VOC" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=9" frameBorder="0"/> ,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="VOC" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=9" frameBorder="0"/> ,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="VOC" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=9" frameBorder="0"/> ,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="VOC" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=9" frameBorder="0"/> ,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="VOC" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=9" frameBorder="0"/> ,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="VOC" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=9" frameBorder="0"/> ,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="VOC" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=9" frameBorder="0"/>
            },
            "IEQ":{
                "RT": <iframe style={{position: "absolute"}} width={350} height={250} title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={350} height={250} title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={350} height={250} title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={350} height={250} title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={350} height={250} title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={350} height={250} title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={350} height={250} title="IEQ" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21" frameBorder="0"/>
            },
            "CH2O":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CH2O" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=11" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CH2O" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=11" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CH2O" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=11" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CH2O" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=11" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CH2O" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=11" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CH2O" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=11" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CH2O" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=11" frameBorder="0"/>
            },
            "CO2":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=12" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=12" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=12" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=12" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=12" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=12" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=12" frameBorder="0"/>
            },
            "E":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="E" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=10" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="E" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=10" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="E" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=10" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="E" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=10" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="E" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=10" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="E" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=10" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="E" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=10" frameBorder="0"/>
            },
            "Light":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Light" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20" frameBorder="0"/>
            },
            "PM2.5":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM2.5" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=16" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM2.5" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=16" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM2.5" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=16" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM2.5" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=16" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM2.5" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=16" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM2.5" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=16" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM2.5" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=16" frameBorder="0"/>
            },
            "PM10":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM10" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=15" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM10" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=15" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM10" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=15" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM10" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=15" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM10" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=15" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM10" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=15" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM10" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=15" frameBorder="0"/>
            },
            "Air":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Air" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6" frameBorder="0"/>
            },
            "CO":{
                "RT":  <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=13" frameBorder="0"/>,
                "3H":  <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=13" frameBorder="0"/>,
                "12H":  <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=13" frameBorder="0"/>,
                "24H":  <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=13" frameBorder="0"/>,
                "3D":  <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=13" frameBorder="0"/>,
                "1W":  <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=13" frameBorder="0"/>,
                "1H":  <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=13" frameBorder="0"/>
            },
            "NO2":{
                "RT": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="NO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=14" frameBorder="0"/>,
                "3H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="NO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=14" frameBorder="0"/>,
                "12H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="NO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=14" frameBorder="0"/>,
                "24H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="NO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=14" frameBorder="0"/>,
                "3D": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="NO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=14" frameBorder="0"/>,
                "1W": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="NO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=14" frameBorder="0"/>,
                "1H": <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="NO2" src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=14" frameBorder="0"/>
            }
        }

        return (
            <div className="row" style={{height: "100%", margin: "10px"}}>
                <div className="col-4">
                    <div className="row" style={{height: "33%"}}>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}/>
                                <div className="holder" style={{borderColor: "#c2a29f", opacity : topic==="Dash"||topic==="Temp"?1:0.2 }}>
                                    {iframes["T"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Temp")}/>
                                </div>
                        </div>
                        <div className="col-6">
                                <div className="holder" style={{borderColor: "#c2a29f", opacity : topic==="Dash"||topic==="Temp"?1:0.2 }}>
                                    {iframes["RH"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Temp")}/>
                                </div>
                            <div className="row" style={{height: "50%"}}>
                                <div className="holderGauge" style={{zIndex:1, left:"-45px", opacity : topic==="Dash"||topic==="Temp"?1:0.2}}>
                                    {iframes["Temp"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Temp")}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{height: "33%"}}/>
                    <div className="row" style={{height: "33%"}}>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}/>
                            <div className="holder" style={{borderColor: "rgb(132,151,131)", opacity : topic==="Dash"||topic==="Sound"?1:0.2}}>
                                {iframes["SPL"][timeWindow]}
                                <div className="overlay" style={{position: "absolute"}}
                                     onClick={() => setTopic("Sound")}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}>
                                <div className="holderGauge" style={{zIndex:1,position:"relative", top:"-55px", left:"-45px", opacity : topic==="Dash"||topic==="Sound"?1:0.2}} >
                                    {iframes["Sound"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Sound")}/>
                                </div>
                            </div>
                            <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                {iframes["VOC"][timeWindow]}
                                <div className="overlay" style={{position: "absolute"}}
                                     onClick={() => setTopic("Air")}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row" style={{height: "33%"}}/>
                    <div className="row" style={{height: "33%"}}>
                        <div className="holderGauge"  style={{zIndex:0, opacity : topic==="Dash"?1:0.2}}>
                            {iframes["IEQ"][timeWindow]}
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => setTopic("Dash")}/>
                        </div>
                    </div>
                    <div className="row" style={{height: "33%"}}>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}/>
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    {iframes["CH2O"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                        </div>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}/>
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    {iframes["CO2"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row" style={{height: "33%"}}>
                        <div className="col-6">
                                <div className="holder" style={{borderColor: "rgb(236, 203, 123)", opacity : topic==="Dash"||topic==="Light"?1:0.2}}>
                                    {iframes["E"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Light")}/>
                                </div>
                            <div className="row" style={{height: "50%"}}>
                                <div className="holderGauge" style={{zIndex:1, position:"relative", left:"-50px", opacity : topic==="Dash"||topic==="Light"?1:0.2}}>
                                    {iframes["Light"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Light")}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6"/>
                    </div>
                    <div className="row" style={{height: "33%"}}>
                        <div className="col-6"/>
                        <div className="col-6">
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    {iframes["PM2.5"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                            <div className="row" style={{height:"40px"}}/>
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    {iframes["PM10"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                        </div>
                    </div>
                    <div className="row" style={{height: "33%"}}>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}>
                                <div className="holderGauge" style={{zIndex:1, position:"relative", top:"-55px", left:"-50px", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    {iframes["Air"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                            </div>
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    {iframes["CO"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                        </div>
                        <div className="col-6">
                                <div className="row" style={{height:"50%"}}/>
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    {iframes["NO2"][timeWindow]}
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                            <div className="row" style={{height: "50%"}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    function DashGraphs() {
        const iframes = {
            "Temp": {
                "RT": <iframe  style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=23&refresh=5s"  frameBorder="0"/>,
                "3H": <iframe  style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
                "12H": <iframe  style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
                "24H": <iframe  style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
                "3D": <iframe  style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
                "1W": <iframe  style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>,
                "1M": <iframe  style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=27&refresh=5s"  frameBorder="0"/>
            },
            "Light": {
                "RT":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
                "3H":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
                "12H":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
                "24H":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
                "3D":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
                "1W":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
                "1M":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24&refresh=5s"  frameBorder="0"/>,
            },
            "Sound": {
                "RT":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
                "3H":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
                "12H":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
                "24H":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
                "3D":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
                "1W":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
                "1M":<iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26&refresh=5s"  frameBorder="0"/>,
            },
            "Air": {
                "RT" : <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
                "3H" : <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
                "12H" : <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
                "24H" : <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
                "3D" : <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
                "1W" : <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
                "1M" : <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25&refresh=5s"  frameBorder="0"/>,
            },
        }
        if(topic==="Dash")
        return (
            <div className="container" style={{height:"100%"}}>
               <div className="row h-50">
                    <div className="col-6">{iframes["Temp"][timeWindow]}</div>
                    <div className="col-6">{iframes["Light"][timeWindow]}</div>
               </div>
                <div className="row h-50">
                    <div className="col-6">{iframes["Sound"][timeWindow]}</div>
                    <div className="col-6">{iframes["Air"][timeWindow]}</div>
                </div>
            </div>
        );
        else
            return(
                <div className="container" style={{height:"100%"}}>
                        {iframes[topic][timeWindow]}
                </div>
            )

    }
}
