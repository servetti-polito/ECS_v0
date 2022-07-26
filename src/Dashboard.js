import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Dashboard(props){

    let [date, setDate] = useState("")
    let [time, setTime] = useState("")
    let [referenceValue, setReferenceValue] = useState("80%")
    let [RTValue, setRTValue] = useState("60%")
    let [showCompliances, setShowCompliances] = useState(true)

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


    console.log("userJWT",props.userJwt)
    if(props.userJwt === null)
        return (
            <div className="container">
                <div className="row h-25" />
                <div className="row h-50 align-items-center">
                    <div className="col-12">
                        <h1 className="display-1 text-center">{props.ita ? "401:Utente non autorizzato" : "401: Unauthorized user"}</h1>
                    </div>
                    <div className="row gap-2">
                        <div className="col-lg-3 col-1"/>
                        <div className="d-grid col-lg-6 col-10">
                            <button className="btn btn-lg btn-primary" type="button" onClick={routeLogin}>{props.ita ? "Accedi" : "Log in"}</button>
                        </div>
                        <div className="col-lg-3 col-1"/>
                    </div>
                </div>
            </div>
        );
    else
        return (
            <div className="container">
                <div className="row h-100">
                    <div className="col-4" style={{backgroundColor: "#FF9724", borderRadius: "50px"}}>
                        <div className="row">
                            <h1 style={{textAlign:"center", fontSize:"300%", marginTop:"20px"}}>PROMET&O</h1>
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
                            <h2 style={{textAlign:"center", paddingTop:"50px"}}>Indoor Environmental Quality</h2>
                        </div>
                        <div className="row">
                            <h5 style={{textAlign:"center", padding:"20px"}}>Indoor Environmental Quality is the physical characterization of indoor environments in terms of thermal, acoustic, lighting and indoor air quality.
                            </h5>
                        </div>
                        <div className="row">
                            <h2 style={{textAlign:"center"}}>Reference value: {referenceValue}</h2>
                        </div>
                        <div className="row align-items-end" style={{height: "40%"}}>
                            <h2 style={{textAlign:"center"}}>{showCompliances ? "Mean Value: 60%\nStandard Deviation: 3%\n10th Percentile: 60%\n90th Percentile: 5%\n" : "Real-time value: "+RTValue}</h2>
                        </div>
                        <div className="row justify-content-center" >
                            <button style={{"font-size": "175%", "width":"75%", "color":"#FF9724"}} className="btn btn-white" type="button">Show the graph</button>
                        </div>
                    </div>
                    <div className="col-8">
                        <div style={{margin:"40px"}}/>
                        <div className="row" style={{width:"80%"}}>
                            <div className="col"><button  className="btn btn-primary">RT</button></div>
                            <div className="col"><button  className="btn btn-primary">3H</button></div>
                            <div className="col"><button  className="btn btn-primary">12H</button></div>
                            <div className="col"><button  className="btn btn-primary">24H</button></div>
                            <div className="col"><button  className="btn btn-primary">3D</button></div>
                            <div className="col"><button  className="btn btn-primary">1W</button></div>
                            <div className="col"><button  className="btn btn-primary">1M</button></div>
                        </div>
                        <div style={{height:"75%", border:"2px solid red", marginTop:"15px", marginBottom:"20px"}}> iframe </div>
                        <div className="row">
                            <div style={{width:"68%"}}/>
                            <button style={{"width":"30%"}} className="btn btn-white-border" type="button" onClick={toggleCompliance}>{showCompliances ? "Hide compliance":"Show compliance"}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
}

