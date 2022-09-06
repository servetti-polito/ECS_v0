import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/dashboard.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";

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
    if(props.userJwt === null)
        navigate("/login")
    else
        return (
            <div id="Dashboard" className="container">
                <div className="row h-100">
                    <div className="col-4" style={{backgroundColor: "#FF9724", borderRadius: "50px"}}>
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
                        <div style={{height:"70%", border:"2px solid red", marginTop:"15px", marginBottom:"20px"}}>{showGraph ? "graph ":"iframe "}{timeWindow} {topic}</div>
                        <div className="row">
                            <div style={{width:"68%"}}/>
                            <button style={{"width":"30%"}} className="btn btn-white-border" type="button" onClick={toggleCompliance}>{showCompliances ? "Hide compliance":"Show compliance"}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
}

