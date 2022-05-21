import 'survey-core/modern.min.css';
import { Survey, Model } from 'survey-react-ui';
import { StylesManager } from 'survey-core';
import "./App.css";
//import * as surveyJSON from './resources/survey_vertical.json';
import * as surveyJSON from './resources/survey_horizontal.json';

StylesManager.applyTheme("modern");

//on completion callback
function sendDataToServer(survey) {
  alert("The results are: " + JSON.stringify(survey.data));
}

function SurveyJS() {
  const survey = new Model(surveyJSON);
  return <Survey model = {survey} onComplete={sendDataToServer} />
}
  export default SurveyJS;
