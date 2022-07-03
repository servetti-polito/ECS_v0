import 'survey-core/modern.min.css';
import { Survey, Model } from 'survey-react-ui';
import { StylesManager } from 'survey-core';
import * as surveyJSON from './resources/personal.json';
import { useNavigate } from "react-router-dom";
import * as css from "./CSS/Personal.css";

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
    return <div className='container-fluid'>
        <Survey id = 'survey' css={css} model = {survey} onComplete={sendDataToServer} />
    </div>
}
export default Personal;