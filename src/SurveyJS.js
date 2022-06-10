import 'survey-core/modern.min.css';
import { Survey, Model } from 'survey-react-ui';
import { StylesManager } from 'survey-core';
import "./Hello.css";
import $ from 'jquery';
import * as surveyJSONVertical from './resources/survey_vertical.json';
//import * as surveyJSONHorizontal from './resources/survey_horizontal.json';
import * as surveyJSONHorizontal from './resources/survey_fullyHorizontal.json';
import {wait} from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
import autoRedirect from "./autoRedirect";
import {Alert} from "react-bootstrap";

const V_HORIZONTAL = false;
const ITA = false;
const offset = "+=2000px"
const counteroffset = "-=4000px"

StylesManager.applyTheme("modern");

function SurveyJS(props) {
  let navigate = useNavigate();
  let redirect = autoRedirect(300); //5 minutes
  if(redirect === 0)
      navigate("/")
  //RESPONSE//////////////////////////////////////////////////////////////////////////////////////////
  function sendDataToServer(sur) {
    alert("The results are: " + JSON.stringify(sur.data));
    if (props.logged==="")
      navigate("/login")
    else
      navigate("/thanks")
  }
  //LAYOUT E LINGUA////////////////////////////////////////////////////////////////////////////////////
  let surveyJSON;
  if(V_HORIZONTAL)
    surveyJSON = surveyJSONHorizontal;
  else
    surveyJSON = surveyJSONVertical;
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
    if(V_HORIZONTAL) {
      $(document.getElementById("survey")).animate({"right": offset}, "fast");
    }
    else {
      $(document.getElementById("survey")).slideUp();
    }
  });
  survey.onCurrentPageChanged.add(function () {
    if(V_HORIZONTAL)
    {
      $(document.getElementById("survey")).css({right: counteroffset}).animate({ "right": offset }, "fast" );
    }
    else
    {
      $(document.getElementById("survey")).hide().slideDown();
    }
  });
  survey.onCompleting.add(function (sender, options) {
    if (!doAnimantion) return;
    options.allowComplete = false;
    setTimeout(function () {
      doAnimantion = false;
      sender.doComplete();
      doAnimantion = true;
    }, 500);
    if(V_HORIZONTAL){
      //$(document.getElementById("survey")).animate({ "right": offset }, "fast" ).animate({ "right": counteroffset }, "fast" );
      //wait(1000)
      //$(document.getElementById("survey")).animate({ "right": counteroffset }, "fast" );
    }
    else
    {
    $(document.getElementById("survey")).slideUp()
    wait(1000)
    $(document.getElementById("survey")).slideDown()
    }
  });

  return <>
    { redirect < 60 ?
        <Alert><h1>Are you still there?</h1><h3>You will be redirected in {redirect} seconds</h3></Alert> : null
    }
    <Survey id = 'survey' css='position: relative' model = {survey} onComplete={sendDataToServer} />
  </>
}
  export default SurveyJS;