import 'survey-core/modern.min.css';
import { Survey, Model } from 'survey-react-ui';
import { StylesManager } from 'survey-core';
import * as surveyJSON from './resources/personal.json';
import { useNavigate } from "react-router-dom";
import * as css from "./CSS/Personal.css";
import {API} from "aws-amplify";
import {useEffect, useState} from "react";

StylesManager.applyTheme("modern");

function Personal(props) {
    let navigate = useNavigate();
    let user = localStorage.getItem("personalUsername")
    let oldValues = null

    useEffect(()=>{
        console.log("USER: "+user)
        console.log("DEVICE: "+props.deviceJwt)
        if((user===null || user === undefined)&&props.deviceJwt===null)
            navigate("/login")
        if(user!==null) {
            let init={
                headers:{
                    Authorization : localStorage.getItem("userJwt")
                }
            }
            console.log("INIT: "+ JSON.stringify(init))
            API.get("userTokenAPI", "/personal/personalID?user=" + user, init).then(resp => {
                console.log(JSON.stringify(resp))
                resp.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0))
                oldValues=resp[0]
                if(oldValues!==null)
                    fillOldValues()
            }).catch(err => {
                if(err["message"].includes("401"))
                {
                    localStorage.setItem("sessionExpired","true")
                    props.doLogout()
                    navigate("/login")
                }
            })
        }
    }, [])
    //FILL OLD VALUES///////////////////////////////////////////////////////////////////////////////////
    function fillOldValues()
    {
        for(let ov in oldValues)
        {
            if(ov!=="personalID" && ov!=="user" && ov!=="timestamp") {
                survey.setValue(ov, oldValues[ov]);
            }
        }
    }
    //RESPONSE//////////////////////////////////////////////////////////////////////////////////////////
    function sendDataToServer(sur) {
        console.log("user: "+user);
        if((user===undefined || user === null) && props.anon===null)
        {
            console.log("No user assigned")
            return
        }
        if(Object.keys(sur.data).length === 0) {
            localStorage.setItem("previousPersonal", true)
            navigate("/thanks")
        }
        else
        {
            let data = sur.data;
            data.personalID = generateResponseId()
            data.user = user===null ? props.anon : user
            data.timestamp = Date.now()
            let init = {
                body: data,
                headers: {Authorization : props.deviceJwt}
            }
            console.log("Sending: ", JSON.stringify(init))
            API.post("userTokenAPI", "/personal", init).then(resp=>{
                console.log("post ok: "+JSON.stringify(resp));
                localStorage.setItem("previousPersonal", true)
                navigate("/thanks")
            }).catch(err=>console.log("post failed: "+JSON.stringify(err.response)))
        }
    }
    //LAYOUT E LINGUA////////////////////////////////////////////////////////////////////////////////////
    const survey = new Model(surveyJSON);
    if(props.ita)
        survey.locale='it'
    return <div className='container-fluid'>
        <Survey id = 'personal' css={css} model = {survey} onComplete={sendDataToServer} />
        <p id="prometeoSmallLogo" style={{marginTop:"-60px"}}>PROMET&O</p>
    </div>
}

function generateResponseId()
{
    return "response"+Math.floor(10000000 + Math.random() * 90000000).toString()
}

export default Personal;