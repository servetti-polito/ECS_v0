import 'survey-core/modern.min.css';
import { Survey, Model } from 'survey-react-ui';
import { StylesManager } from 'survey-core';
import * as surveyJSON from './resources/personal.json';
import { useNavigate } from "react-router-dom";
import * as css from "./CSS/Personal.css";
import {API} from "aws-amplify";
import {useState} from "react";

StylesManager.applyTheme("modern");

function Personal(props) {
    let navigate = useNavigate();
    let user = localStorage.getItem("personalUsername")
    //RESPONSE//////////////////////////////////////////////////////////////////////////////////////////
    function sendDataToServer(sur) {
        console.log("user: "+user);
        if((user===undefined || user === null) && props.anon===null)
        {
            console.log("No user assigned")
            return
        }
        if(Object.keys(sur.data).length === 0)
            navigate("/thanks")
        else
        {
            let data = sur.data;
            data.personalID = generateResponseId()
            data.user = user===null ? props.anon : user
            let init = {
                body: data,
                headers: {Authorization : props.deviceJwt}
            }
            console.log("Sending: ", JSON.stringify(init))
            API.post("userTokenAPI", "/personal", init).then(resp=>{
                console.log("post ok: "+JSON.stringify(resp));
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
    </div>
}

function generateResponseId()
{
    return "response"+Math.floor(10000000 + Math.random() * 90000000).toString()
}

export default Personal;