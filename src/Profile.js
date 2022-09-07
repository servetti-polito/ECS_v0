import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {Alert, Button, Spinner} from "react-bootstrap";
import {API} from "aws-amplify";
import {useEffect, useState} from "react";

export default function Profile(props){
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([])
    let navigate = useNavigate();
    const routeDashbaord = ()=>navigate("/dashboard")
    const routePersonal = () => navigate("/personal")
    const headers = {
        headers: {"Authorization": props.deviceJwt}
    };
    function listUpdate()
    {
        let result=""
        let locale = "en"
        if(props.ita)
            locale = "it"
        if(list.length===0) {
            let text = "No data collected"
            if(props.ita)
                text = "Nessun dato"
            return "<div className=\"row text-center\"><h3 style=\"width:'100%'; border-bottom: 1px solid #ff9724\"}}>"+text+"</h3></div>"
        }
        list.map(it=>
            result+="<div className=\"row text-center\"><h3 style=\"width:'100%'; border-bottom: 1px solid #ff9724\"}}>"+new Date(it.timestamp).toLocaleString(locale)+"</h3></div>")
        return result
    }
    useEffect(()=>{
        setLoading(true)
        API.get("userTokenAPI", "/survey/user?user="+props.logged, headers)
            .then(async data => {setList(data);setLoading(false)}).catch(err=>{setError("get fail:"+err); setLoading(false)})
    },[])
    useEffect(()=>{
        if(document.getElementById("list")===null)
            return
        document.getElementById("list").innerHTML = listUpdate()
    }, [list])


    if(props.logged===undefined||props.logged===null||props.logged==="")
        navigate("/login")
    return (
        <div className="container">
            <div className="row">
                <div className="col-12" style={{marginTop:20, marginBottom:0, textAlign:"center", borderBottom:"2px solid #ff9724"}}>
                    <h1>{props.ita ? "Benvenuto ": "Welcome "}{props.logged}</h1></div>
            </div>
            <div className="row" style={{marginTop:20, marginBottom:20}}>
                <div className="col-1"/>
                <div className="col-4">
                    <Button style={{width:"100%"}} classname="btn btn-primary" onClick={routeDashbaord}>Dashboard</Button>
                </div>
                <div className="col-2"/>
                <div className="col-4">
                    <Button style={{width:"100%"}} classname="btn btn-primary" onClick={routePersonal}>{props.ita ? "Area Personale" : "Personal"}</Button>
                </div>
                <div className="col-2"/>
            </div>
            <div className="row h-75" style={{textAlign:"center", margin:10}}>
                <div className="col-2"/>
                <div className="col-8">
                    <div className="row text-center" style={{borderBottom:"3px solid #FF9724", marginBottom:20}}>
                        <h1 style={{width:"100%"}}>{props.ita ? "Risposte ai sondaggi" : "Survey answers"}</h1>
                    </div>
                    { error!=="" ? <Alert variant="danger">{error}</Alert> : null}
                    { loading ? <Spinner animation='border' variant="dark"/> : <div id="list"/>}
                </div>
                <div className="col-2"/>
            </div>
        </div>
    );
}