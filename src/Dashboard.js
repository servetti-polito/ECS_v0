import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/dashboard.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const titles = {
    "Dash": "Indoor Environmental Quality",
    "Air": "Air quality",
    "Temp": "Temperature",
    "Light": "Light",
    "Sound": "Sound"
}
const explain = {
    "Dash": "Some text about Indoor Environmental Quality",
    "Air": "Some text about Air quality",
    "Temp": "Some text about Temperature",
    "Light": "Some text about Light",
    "Sound": "Some text about sound"
}

export default function Dashboard(props) {

    let [date, setDate] = useState("")
    let [time, setTime] = useState("")
    let [referenceValue, setReferenceValue] = useState("80%")
    let [RTValue, setRTValue] = useState("60%")
    let [showCompliances, setShowCompliances] = useState(false)
    let [showGraph, setShowGraph] = useState(false)
    let [timeWindow, setTimeWindow] = useState("RT")
    let [topic, setTopic] = useState("Dash")

    setInterval(() => {
        let dateTime = new Date();
        let timeString = dateTime.toTimeString().split(' ')[0].slice(0, -3)
        let dateString = dateTime.toLocaleDateString('en-GB')
        setDate(dateString)
        setTime(timeString)
    }, 1000)

    let navigate = useNavigate();
    const routeLogin = () => {
        navigate("/login")
    }
    const toggleCompliance = () => {
        setShowCompliances(!showCompliances);
    }
    const toggleGraph = () => {
        setShowGraph(!showGraph);
    }

    if (props.userJwt === null)
        navigate("/login")
    else
        return (
            <div id="Dashboard" className="container">
                <div className="row h-100">
                    <div className="container col-4" style={{backgroundColor: "#FF9724", borderRadius: "50px"}}>
                        <div className="row">
                            <h1 style={{textAlign: "center", fontSize: "300%", marginTop: "20px", fontFamily: 'Ink Free'}}>PROMET&O</h1>
                        </div>
                        <div className="row">
                            <div className="col-5" style={{backgroundColor: "white", borderRadius: "10px", marginRight: "2.5%", marginLeft: "5%"}}>
                                <h3 style={{textAlign: "center", margin: "5px", marginLeft: 0, letterSpacing: "-1px", color: "#FF9724"}}>{date}</h3>
                            </div>
                            <div className="col-5" style={{backgroundColor: "white", borderRadius: "10px", marginLeft: "2.5%", marginRight: "5%"}}>
                                <h3 style={{textAlign: "center", margin: "5px", color: "#FF9724"}}>{time}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <h2 style={{textAlign: "center", paddingTop: "50px"}}>{titles[topic]}</h2>
                        </div>
                        <div className="row">
                            <h5 style={{textAlign: "center", padding: "20px"}}>{explain[topic]}</h5>
                        </div>
                        <div className="row">
                            <h4 style={{textAlign: "center"}}>Reference value: {referenceValue}</h4>
                        </div>
                        <div className="row" id="compliances">
                                {showCompliances ?
                                    <h4 style={{textAlign: "center"}}>
                                        Mean Value: 60%<br/>Standard Deviation: 3%<br/>10th Percentile: 60%<br/>90th Percentile: 5%
                                    </h4>

                                    : <h4 style={{textAlign: "center"}}>Real-time value: {RTValue}</h4>
                                }
                        </div>
                        <div className="row" style={{position:"fixed", bottom:"50px", width:"34%"}}>
                            <div className="row justify-content-center">
                                <button style={{fontSize: "150% !important", "width": "75%", "color": "#FF9724"}}
                                        className="btn btn-white" type="button"
                                        onClick={toggleGraph}>{showGraph ? "Hide the graph" : "Show the graph"}</button>
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
                        <div className="row">
                            <div style={{width: "68%"}}/>
                            <button style={{"width": "30%"}} className="btn btn-white-border" type="button"
                                    onClick={toggleCompliance}>{showCompliances ? "Hide compliance" : "Show compliance"}</button>
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

        return (
            <div className="row" style={{height: "100%", margin: "10px"}}>
                <div className="col-4">
                    <div className="row" style={{height: "33%"}}>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}/>
                                <div className="holder" style={{borderColor: "#c2a29f", opacity : topic==="Dash"||topic==="Temp"?1:0.2 }}>
                                    <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="T"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146601379&amp;to=1663168201379&amp;panelId=7"
                                            frameBorder="0"/>
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Temp")}/>
                                </div>
                        </div>
                        <div className="col-6">
                                <div className="holder" style={{borderColor: "#c2a29f", opacity : topic==="Dash"||topic==="Temp"?1:0.2 }}>
                                    <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="RH"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146185228&to=1663167785228&panelId=4"
                                            frameBorder="0"/>
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Temp")}/>
                                </div>
                            <div className="row" style={{height: "50%"}}>
                                <div className="holderGauge" style={{zIndex:1, left:"-45px", opacity : topic==="Dash"||topic==="Temp"?1:0.2}}>
                                    <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Temp"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;from=1663149719485&amp;to=1663171319485&amp;panelId=19"
                                            frameBorder="0"/>
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
                                <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="SPL"
                                        src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=8"
                                        frameBorder="0"/>
                                <div className="overlay" style={{position: "absolute"}}
                                     onClick={() => setTopic("Sound")}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}>
                                <div className="holderGauge" style={{zIndex:1,position:"relative", top:"-55px", left:"-45px", opacity : topic==="Dash"||topic==="Sound"?1:0.2}} >
                                    <iframe style={{position: "absolute"}} title="Sound"
                                            width={IFRAMEW_G} height={IFRAMEH_G}
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=18"
                                            frameBorder="0"/>
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Sound")}/>
                                </div>
                            </div>
                            <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="VOC"
                                        src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=9"
                                        frameBorder="0"/>
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
                            <iframe style={{position: "absolute"}} width={350} height={250} title="IEQ"
                                    src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=21"
                                    frameBorder="0"/>
                            <div className="overlay" style={{position: "absolute"}}
                                 onClick={() => setTopic("Dash")}/>
                        </div>
                    </div>
                    <div className="row" style={{height: "33%"}}>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}/>
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CH2O"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=11"
                                            frameBorder="0"/>
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                        </div>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}/>
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO2"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=12"
                                            frameBorder="0"/>
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
                                    <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="E"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=10"
                                            frameBorder="0"/>
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Light")}/>
                                </div>
                            <div className="row" style={{height: "50%"}}>
                                <div className="holderGauge" style={{zIndex:1, position:"relative", left:"-50px", opacity : topic==="Dash"||topic==="Light"?1:0.2}}>
                                    <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Light"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=20"
                                            frameBorder="0"/>
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
                                    <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM2.5"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=16"
                                            frameBorder="0"/>
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                            <div className="row" style={{height:"40px"}}/>
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="PM10"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=15"
                                            frameBorder="0"/>
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                        </div>
                    </div>
                    <div className="row" style={{height: "33%"}}>
                        <div className="col-6">
                            <div className="row" style={{height: "50%"}}>
                                <div className="holderGauge" style={{zIndex:1, position:"relative", top:"-55px", left:"-50px", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    <iframe style={{position: "absolute"}} width={IFRAMEW_G} height={IFRAMEH_G} title="Air"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663146827349&amp;to=1663168427350&amp;panelId=6"
                                            frameBorder="0"/>
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>
                            </div>
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="CO"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=13"
                                            frameBorder="0"/>
                                    <div className="overlay" style={{position: "absolute"}}
                                         onClick={() => setTopic("Air")}/>
                                </div>

                        </div>
                        <div className="col-6">
                                <div className="row" style={{height:"50%"}}/>
                                <div className="holder" style={{borderColor: "rgb(196, 211, 224)", opacity : topic==="Dash"||topic==="Air"?1:0.2}}>
                                    <iframe style={{position: "absolute"}} width={IFRAMEW} height={IFRAMEH} title="NO2"
                                            src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&amp;refresh=5s&amp;from=1663147379085&amp;to=1663168979085&amp;panelId=14"
                                            frameBorder="0"/>
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
            "Temp": <iframe  style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=23"  frameBorder="0"/>,
            "Light": <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=24"  frameBorder="0"/>,
            "Sound": <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=26"  frameBorder="0"/>,
            "Air": <iframe style={{position: "relative", height: "100%", width: "100%"}} src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663212204191&to=1663233804191&panelId=25"  frameBorder="0"/>,
        }
        if(topic==="Dash")
        return (
            <div className="container" style={{height:"100%"}}>
               <div className="row h-50">
                    <div className="col-6">{iframes["Temp"]}</div>
                    <div className="col-6">{iframes["Light"]}</div>
               </div>
                <div className="row h-50">
                    <div className="col-6">{iframes["Sound"]}</div>
                    <div className="col-6">{iframes["Air"]}</div>
                </div>
            </div>
        );
        else
            return(
                <div className="container" style={{height:"100%"}}>
                        {iframes[topic]}
                </div>
            )

    }
}
