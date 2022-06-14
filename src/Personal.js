import 'survey-core/modern.min.css';
import { Survey, Model } from 'survey-react-ui';
import { StylesManager } from 'survey-core';
import "./Hello.css";
import * as surveyJSON from './resources/personal.json';
import { useNavigate } from "react-router-dom";

StylesManager.applyTheme("modern");

function Personal(props) {
    let navigate = useNavigate();
    //RESPONSE//////////////////////////////////////////////////////////////////////////////////////////
    function sendDataToServer(sur) {
        //alert("The results are: " + JSON.stringify(sur.data));
        navigate("/thanks")
    }
    //LAYOUT E LINGUA////////////////////////////////////////////////////////////////////////////////////
    const survey = new Model(surveyJSON);
    if(props.ita)
        survey.locale='it'
    return <>
        <Survey id = 'survey' css='position: relative' model = {survey} onComplete={sendDataToServer} />
    </>
}
export default Personal;