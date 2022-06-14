import 'survey-core/modern.min.css';
import { Survey, Model } from 'survey-react-ui';
import { StylesManager } from 'survey-core';
import "./Hello.css";
import $ from 'jquery';
import * as surveyJSON from './resources/survey.json';
import {wait} from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";

StylesManager.applyTheme("modern");

function SurveyJS(props) {
  let navigate = useNavigate();
  /*const timeout=10*1000;
  let timeLeft = 10;
  let startTime
  let inactivityTimeout = false
  resetTimeout()
  function onUserInactivity() {
      clearTimeout(inactivityTimeout)
      navigate("/")
  }
  function resetTimeout() {
    clearTimeout(inactivityTimeout)
    inactivityTimeout = setTimeout(onUserInactivity, timeout)
    startTime = (new Date()).getTime();
    timeLeft=10;
  }
  window.onmousemove = resetTimeout*/
  //RESPONSE//////////////////////////////////////////////////////////////////////////////////////////
  function sendDataToServer(sur) {
    //alert("The results are: " + JSON.stringify(sur.data));
    if (props.logged==="")
      navigate("/furtherQuestions")
    else
      navigate("/thanks")
  }
  //LAYOUT E LINGUA////////////////////////////////////////////////////////////////////////////////////
  const survey = new Model(surveyJSON);
  if(props.ita)
    survey.locale='it'
  //ANIMAZIONI//////////////////////////////////////////////////////////////////////////////////////////
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
  survey.onCurrentPageChanged.add(function (/*sender*/) {
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

  return <>
    {   //timeLeft < 10 ?
        //<Alert><h1>Are you still there?</h1><h3>You will be redirected {props.logged ? "and logged out" : null} in {timeLeft} seconds</h3></Alert>
        //:null
    }
    <Survey id = 'survey' css='position: relative' model = {survey} onComplete={sendDataToServer} />
  </>
}
export default SurveyJS;