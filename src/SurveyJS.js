import 'survey-core/modern.min.css';
import { Survey, Model } from 'survey-react-ui';
import { StylesManager } from 'survey-core';
import "./Hello.css";
import $ from 'jquery';
import * as surveyJSON from './resources/survey.json';
import {wait} from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
//import autoRedirect from "./AutoRedirect";
//import {Alert} from "react-bootstrap";

const ITA = false;

StylesManager.applyTheme("modern");

function SurveyJS(props) {
  let navigate = useNavigate();
/*  let redirect = autoRedirect(500); //5 minutes
  if(redirect === 0) {
    props.doLogout();
    navigate("/")
  }*/
  //RESPONSE//////////////////////////////////////////////////////////////////////////////////////////
  function sendDataToServer(sur) {
    alert("The results are: " + JSON.stringify(sur.data));
    if (props.logged==="")
      navigate("/furtherQuestions")
    else
      navigate("/thanks")
  }
  //LAYOUT E LINGUA////////////////////////////////////////////////////////////////////////////////////
  const survey = new Model(surveyJSON);
  if(ITA)
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
    { /*redirect < 60 ?
        <Alert><h1>Are you still there?</h1><h3>You will be redirected {props.logged ? "and logged out" : null} in {redirect} seconds</h3></Alert> :
        null*/
    }
    <Survey id = 'survey' model = {survey} onComplete={sendDataToServer} />
  </>
}
  export default SurveyJS;