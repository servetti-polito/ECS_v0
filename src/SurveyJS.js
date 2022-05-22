import 'survey-core/modern.min.css';
import { Survey, Model } from 'survey-react-ui';
import { StylesManager } from 'survey-core';
import "./App.css";
import $ from 'jquery';
import * as surveyJSONVertical from './resources/survey_vertical.json';
import * as surveyJSONHorizontal from './resources/survey_horizontal.json';
import {wait} from "@testing-library/user-event/dist/utils";

const V_HORIZONTAL = true;

StylesManager.applyTheme("modern");


//on completion callback
function sendDataToServer(survey) {
  alert("The results are: " + JSON.stringify(survey.data));
}

function SurveyJS() {

  let surveyJSON;
  if(V_HORIZONTAL)
  {
    surveyJSON = surveyJSONHorizontal;
  }
  else
  {
    surveyJSON = surveyJSONVertical;
  }

  const survey = new Model(surveyJSON);

  var doAnimantion = true;
  survey.onCurrentPageChanging.add(function (sender, options) {
    if (!doAnimantion) return;
    options.allowChanging = false;
    setTimeout(function () {
      doAnimantion = false;
      sender.currentPage = options.newCurrentPage;
      doAnimantion = true;
    }, 500);
    $(document.getElementById("survey")).slideUp();
  });
  survey.onCurrentPageChanged.add(function (sender) {
    $(document.getElementById("survey")).hide().slideDown();
  });
  survey.onCompleting.add(function (sender, options) {
    if (!doAnimantion) return;
    options.allowComplete = false;
    setTimeout(function () {
      doAnimantion = false;
      sender.doComplete();
      doAnimantion = true;
    }, 500);
    $(document.getElementById("survey")).slideUp()
    wait(1000)
    $(document.getElementById("survey")).slideDown()
  });

  return <Survey id = 'survey' model = {survey} onComplete={sendDataToServer} />
}
  export default SurveyJS;