import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {Alert, Button, Spinner, Pagination, Modal} from "react-bootstrap";
import {API} from "aws-amplify";
import {useEffect, useState} from "react";
import "./CSS/Profile.css"
import PrivacyNotice from "./PrivacyNotice";

let MAXPAGES;

export default function Profile(props){
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([])
    const [page, setPage] = useState(0);
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function PrivacyModal() {
        return (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Privacy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PrivacyNotice/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{fontSize:"110% !important"}} variant="secondary" onClick={handleClose}>
                            I understand
                        </Button>
                    </Modal.Footer>
                </Modal>
        );
    }
    //navigation
    let navigate = useNavigate();
    const routeDashbaord = ()=>navigate("/dashboard")
    const routePersonal = () => navigate("/personal")
    const headers = {
        headers: {"Authorization": props.deviceJwt}
    };
    //page update
    function listUpdate()
    {
        let result=""
        if(list.length===0) {
            let text = "No data collected"
            if(props.ita)
                text = "Nessun dato"
            return "<div className=\"row text-center\"><h3 style=\"width:'100%'; border-bottom: 1px solid #ff9724;\"}}>"+text+"</h3></div>"
        }
        list.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0))
        let listOut=[]
        for(let i=0; i<10; i++) {
            if(list[(page * 10) + i]===undefined)
                break
            listOut.push(list[(page * 10) + i])
        }
        listOut.map(it=>
            result+="<div className=\"row text-center\"><h3 id='surveyTime' style=\"width:'100%'; border-bottom: 1px solid #ff9724;\"}}>"+new Date(it.timestamp).toLocaleString(props.ita?"it":"en")+"</h3></div>")
        return result
    }
    useEffect(()=>{
        setLoading(true)
        API.get("userTokenAPI", "/survey/user?user="+props.logged, headers)
            .then(async data => {
                setList(data);
                MAXPAGES= (data.length%10===0)? data.length/10 : Math.floor(data.length/10)+1;
                console.log("MAX PAGES",MAXPAGES);
                setLoading(false)
            }).catch(err=>{setError("get fail:"+err); setLoading(false)})
    },[])

    useEffect(()=>{
        console.log("PAGE",page)
        if(document.getElementById("list")===null)
            return
        document.getElementById("list").innerHTML = listUpdate()
    }, [list, page])

    if(props.logged===undefined||props.logged===null||props.logged==="")
        navigate("/login")
    return (
        <div className="container" id="Profile">
            <div className="row">
                <div className="col-12" style={{marginTop:20, marginBottom:0, textAlign:"center", borderBottom:"2px solid #ff9724"}}>
                    <h1 className="title" id="profileTitle">{props.ita ? "Benvenuto ": "Welcome "}{props.logged}</h1></div>
            </div>
            <div className="row" style={{marginTop:20, marginBottom:20, fontSize:"100% !important"}}>
                <div className="col-1"/>
                <div className="col-4">
                    <Button id="profileButton" style={{width:"100%"}} classname="btn btn-primary" onClick={routeDashbaord}>Dashboard</Button>
                </div>
                <div className="col-2"/>
                <div className="col-4">
                    <Button id="profileButton" style={{width:"100%"}} classname="btn btn-primary" onClick={routePersonal}>{props.ita ? "Area Personale" : "Personal"}</Button>
                </div>
                <div className="col-2"/>
            </div>
            <div className="row h-75" style={{textAlign:"center", margin:10}}>
                <div className="col-2"/>
                <div className="col-8">
                    <div className="row text-center" style={{borderBottom:"3px solid #FF9724", marginBottom:20}}>
                        <h1 className="title" id="profileTitle" style={{width:"100%"}}>{props.ita ? "Risposte ai sondaggi" : "Survey answers"}</h1>
                    </div>
                    { error!=="" ? <Alert variant="danger">{error}</Alert> : null}
                    { loading ? <Spinner animation='border' variant="dark"/> : <div id="list"/>}
                </div>
                <div className="col-2"/>
            </div>
            <div className="row text-center">
                {MAXPAGES>1 ? <Pagination  className='d-flex justify-content-center' style={{position:"fixed", bottom:"10%"}}>
                    <Pagination.Prev disabled={page <= 0} onClick={()=>setPage(page-1)}/>
                    <div style={{width:"30%"}}/>
                    <Pagination.Next disabled={page >= MAXPAGES-1} onClick={()=>setPage(page+1)}/>
                </Pagination> : null}
            </div>
            <p onClick={handleShow} style={{ "position": "fixed", "bottom": 25, "right": 25, textDecoration: "underline", fontSize:"130%"}}>Privacy</p>
            <PrivacyModal/>
        </div>
    );
}