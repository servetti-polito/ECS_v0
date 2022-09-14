import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/dashboard.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const CIRCLE_DIAMETER = "170px";
const IFRAME_HEIGHT = "120";
const IFRAME_WIDTH = "130";

const titles = {
    "Dash":"Indoor Environmental Quality",
    "Air":"Air quality",
    "Temp":"Temp quality",
    "Something":"Something",
    "Idk":"I don't know"
}
const explain = {
    "Dash":"Some text about Indoor Environmental Quality",
    "Air":"Some text about Air quality",
    "Temp":"Some text about Temp quality",
    "Something":"Some text about Something",
    "Idk":"Some text about I don't know"
}

export default function Dashboard(props){

    let [date, setDate] = useState("")
    let [time, setTime] = useState("")
    let [referenceValue, setReferenceValue] = useState("80%")
    let [RTValue, setRTValue] = useState("60%")
    let [showCompliances, setShowCompliances] = useState(false)
    let [showGraph, setShowGraph] = useState(false)
    let [timeWindow, setTimeWindow] = useState("RT")
    let [topic, setTopic] = useState("Dash")

    setInterval(()=>{
        let dateTime = new Date();
        let timeString = dateTime.toTimeString().split(' ')[0].slice(0, -3)
        let dateString = dateTime.toLocaleDateString('en-GB')
        setDate(dateString)
        setTime(timeString)
    }, 1000)

    let navigate = useNavigate();
    const routeLogin =()=>{navigate("/login")}
    const toggleCompliance = () => {
        setShowCompliances(!showCompliances);
    }
    const toggleGraph = () => {
        setShowGraph(!showGraph);
    }

    console.log("userJWT",props.userJwt)
    // if(props.userJwt === null)
    //     navigate("/login")
    // else
        return (
            <div id="Dashboard" className="container">
                <div className="row h-100">
                    <div className="col-3" style={{backgroundColor: "#FF9724", borderRadius: "50px"}}>
                        <div className="row">
                            <h1 style={{textAlign:"center", fontSize:"300%", marginTop:"20px", "font-family":'Ink Free'}}>PROMET&O</h1>
                        </div>
                        <div className="row">
                            <div className="col-5" style={{backgroundColor: "white", borderRadius: "10px", marginRight:"2.5%", marginLeft:"5%"}}>
                                <h3 style={{textAlign:"center", margin:"5px", marginLeft:0, letterSpacing:"-1px", color:"#FF9724"}}>{date}</h3>
                            </div>
                            <div className="col-5" style={{backgroundColor: "white", borderRadius: "10px", marginLeft:"2.5%", marginRight:"5%"}}>
                                <h3 style={{textAlign:"center", margin:"5px", color:"#FF9724"}}>{time}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <h2 style={{textAlign:"center", paddingTop:"50px"}}>{titles[topic]}</h2>
                        </div>
                        <div className="row">
                            <h5 style={{textAlign:"center", padding:"20px"}}>{explain[topic]}</h5>
                        </div>
                        <div className="row">
                            <h2 style={{textAlign:"center"}}>Reference value: {referenceValue}</h2>
                        </div>
                        <div className="row align-items-end" style={{height: "40%"}}>
                            <h2 style={{textAlign:"center"}}>{showCompliances ? "Mean Value: 60%\nStandard Deviation: 3%\n10th Percentile: 60%\n90th Percentile: 5%\n" : "Real-time value: "+RTValue}</h2>
                        </div>
                        <div className="row justify-content-center" >
                            <button style={{"font-size": "175%", "width":"75%", "color":"#FF9724"}} className="btn btn-white" type="button" onClick={toggleGraph}>{showGraph ? "Hide the graph":"Show the graph"}</button>
                        </div>
                    </div>
                    <div className="col-8">
                        <div style={{margin:"2%"}}/>
                        <div className="row" style={{width:"95%"}}>
                            <div className="col"><button className={timeWindow==="RT" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTimeWindow("RT")}}>RT</button></div>
                            <div className="col"><button className={timeWindow==="3H" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTimeWindow("3H")}}>3H</button></div>
                            <div className="col"><button className={timeWindow==="12H" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTimeWindow("12H")}}>12H</button></div>
                            <div className="col"><button className={timeWindow==="24H" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTimeWindow("24H")}}>24H</button></div>
                            <div className="col"><button className={timeWindow==="3D" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTimeWindow("3D")}}>3D</button></div>
                            <div className="col"><button className={timeWindow==="1W" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTimeWindow("1W")}}>1W</button></div>
                            <div className="col"><button className={timeWindow==="1M" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTimeWindow("1M")}}>1M</button></div>
                        </div>
                        <div className="row" style={{height:"1%"}}/>
                        <div className="row" style={{width:"95%"}}>
                            <div className="col"><button className={topic==="Dash" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTopic("Dash")}}>Dashboard</button></div>
                            <div className="col"><button className={topic==="Air" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTopic("Air")}}>Air</button></div>
                            <div className="col"><button className={topic==="Temp" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTopic("Temp")}}>Temp</button></div>
                            <div className="col"><button className={topic==="Something" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTopic("Something")}}>Something</button></div>
                            <div className="col"><button className={topic==="Idk" ? "btn btn-primary btn-dash" : "btn btn-white-border btn-dash"} onClick={()=>{setTopic("Idk")}}>IDK</button></div>
                        </div>
                        <div id="graphBox" style={{height:"70%", marginTop:"15px", marginBottom:"20px"}}>
                            {topic==="Dash" ? <DashGraphs/> : (showGraph ? "graph ":"iframe ")+timeWindow+" "+topic}
                        </div>
                        <div className="row">
                            <div style={{width:"68%"}}/>
                            <button style={{"width":"30%"}} className="btn btn-white-border" type="button" onClick={toggleCompliance}>{showCompliances ? "Hide compliance":"Show compliance"}</button>
                        </div>
                    </div>
                </div>
            </div>);
        // );
}

function DashGraphs ()
{
    let VIRGINIA = false
    if (VIRGINIA)
        return (
        <div className="row" style={{height:"85%"}}>
            <div className="col-2">
                <div className="row" style={{height:"20%"}}/>
                <div className="row" style={{background:"rgb(167,101,102)", height:"20%", margin:"10px"}}>T</div>
                <div className="row" style={{height:"20%"}}/>
                <div className="row" style={{background:"rgb(132, 151, 131)", height:"25%", margin:"10px"}}>spl</div>
                <div className="row" style={{height:"10%"}}/>
            </div>
            <div className="col-2">
                <div className="row" style={{background:"rgb(167,101,102)", height:"20%", margin:"10px"}}>RH</div>
                <div className="row" style={{height:"5%"}}/>
                <div className="row" style={{background:"rgb(167,101,102)", height:"30%", margin:"10px"}}>temp</div>
                <div className="row" style={{height:"5%"}}/>
                <div className="row" style={{background:"rgb(132, 151, 131)", height:"30%", margin:"10px"}}>audio</div>
                <div className="row" style={{height:"5%"}}/>
            </div>
            <div className="col-2">
                <div className="row" style={{height:"30%"}}/>
                <div className="row" style={{background:"#ff9724", height:"30%", margin:"10px"}}>IEQ</div>
                <div className="row" style={{height:"5%"}}/>
                <div className="row" style={{background:"rgb(132, 151, 131)", height:"25%", margin:"10px"}}>VOC</div>
            </div>
            <div className="col-2">
                <div className="row" style={{background:"rgb(236, 203, 123)", height:"20%", margin:"10px"}}>E</div>
                <div className="row"/>
                <div className="row" style={{background:"rgb(236, 203, 123)", height:"30%", margin:"10px"}}>Luce</div>
                <div className="row"/>
                <div className="row" style={{background:"rgb(196, 211, 224)", height:"30%", margin:"10px"}}>aria</div>
                <div className="row"/>
                <div className="row" style={{background:"rgb(196, 211, 224)", height:"20%", margin:"10px"}}>ch2o</div>
            </div>
            <div className="col-2">
                <div className="row" style={{height:"75%"}}/>
                <div className="row" style={{background:"rgb(196, 211, 224)", height:"25%", margin:"10px"}}>co2</div>
            </div>
            <div className="col-2" >
                <div className="row" style={{height:"10%"}}/>
                <div className="row" style={{background:"rgb(196, 211, 224)", height:"20%", margin:"10px"}}>pm2.5</div>
                <div className="row" style={{background:"rgb(196, 211, 224)", height:"20%", margin:"10px"}}>pm10</div>
                <div className="row" style={{background:"rgb(196, 211, 224)", height:"20%", margin:"10px"}}>no2</div>
                <div className="row" style={{background:"rgb(196, 211, 224)", height:"20%", margin:"10px"}}>co</div>
                <div className="row" style={{height:"10%"}}/>
            </div>
        </div>
    )
    else
        return(
        <div className="row" style={{height:"100%", margin:"10px"}}>
            <div className="col-4">
                <div className="row" style={{height:"33%"}}>
                    <div className="col-6">
                        <div className="row" style={{height:"50%"}}/>
                        <div style={{borderRadius: "50%", border:"10px solid #c2a29f", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146601379&to=1663168201379&panelId=7" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                        </div>
                    </div>
                    <div className="col-6">
                        <div style={{borderRadius: "50%", border:"10px solid #c2a29f", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146185228&to=1663167785228&panelId=4" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                        </div>
                        <div>
                        <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663149719485&to=1663171319485&panelId=19" width="300" height="300" frameborder="0"></iframe>
                        </div>
                    </div>
                </div>
                <div className="row" style={{height:"18%"}}/>
                <div className="row" style={{height:"33%"}}>
                    <div className="col-6">
                        <div className="row" style={{height:"50%"}}/>
                        <div style={{borderRadius: "50%", border:"10px solid #849783", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146827349&to=1663168427350&panelId=8" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                        <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663149689211&to=1663171289211&panelId=18" width="300" height="300" frameborder="0"></iframe>
                        </div>
                        
                        <div style={{borderRadius: "50%", border:"10px solid #c4d3e0", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663147379085&to=1663168979085&panelId=9" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            {/* CENTRAL COLUMN */}
            <div className="col-4">
                <div className="row" style={{height:"33%"}} />
                {/* IEQ GAUGE ROW */}
                <div className="row"  style={{height:"25%"}}>
                  <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663149812344&to=1663171412344&panelId=21" width="300" height="300" frameborder="0"></iframe>
                </div>
                <div className="row" style={{height:"33%"}}>
                    <div className="col-6">
                        <div className="row" style={{height:"50%"}}/>
                        <div style={{borderRadius: "50%", border:"10px solid #c4d3e0", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146951615&to=1663168551615&panelId=11" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row" style={{height:"50%"}}/>
                        <div style={{borderRadius: "50%", border:"10px solid #c4d3e0", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663147433429&to=1663169033429&panelId=12" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="col-4">
                <div className="row" style={{height:"33%"}}>
                    <div className="col-6">
                      <div style={{borderRadius: "50%", border:"10px solid #eccb7b", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663146673651&to=1663168273651&panelId=10" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                      </div>
                      <div>
                        <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663149757565&to=1663171357565&panelId=20"  width="300" height="300" frameborder="0"></iframe>
                      </div>
                    </div>
                    <div className="col-6"/>
                </div>
                <div className="row" style={{height:"18%"}}>
                  <div className="col-6"/>
                  <div className="col-6">
                    <div style={{borderRadius: "50%", border:"10px solid #c4d3e0", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                      <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663147048574&to=1663168648575&panelId=16" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                    </div>
                    <div style={{borderRadius: "50%", border:"10px solid #c4d3e0", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                      <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663147179112&to=1663168779112&panelId=15" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                    </div>
                  </div>
                </div>
                <div className="row" style={{height:"33%"}}>
                    <div className="col-6">
                        <div>
                          <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&from=1663149622840&to=1663171222841&panelId=6"  width="300" height="300" frameborder="0"></iframe>
                        </div>
                        <div style={{borderRadius: "50%", border:"10px solid #c4d3e0", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663147253668&to=1663168853668&panelId=13" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row" style={{height:"50%"}}></div>
                      <div style={{borderRadius: "50%", border:"10px solid #c4d3e0", width:CIRCLE_DIAMETER, height:CIRCLE_DIAMETER, display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <iframe src="https://dev.prometeo.click/chart/d-solo/-eCH23G4k/nuova2?orgId=1&refresh=5s&from=1663147212870&to=1663168812870&panelId=14" width={IFRAME_WIDTH} height={IFRAME_HEIGHT} frameborder="0"></iframe>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}