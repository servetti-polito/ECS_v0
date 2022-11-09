import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {API} from "aws-amplify";
import {Alert, Button, Modal, Spinner} from "react-bootstrap";
import hide from "./resources/images/eye_closed.png"
import show from "./resources/images/eye_open.png"
import "./CSS/CreateAccount.css"
import PrivacyNotice from "./PrivacyNotice";
import emailsText from "./resources/emails.json";

function CreateAccount(props) {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        let curShowPW = showPassword
        setShowPassword(!curShowPW)
    }

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    function PrivacyModal() {
        return (
            <Modal show={showModal} onHide={handleClose}>
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


    return (
        <div className="container" style={{"padding":"50px"}}>
            <div style={{padding: 50}}/>
            <div className="row h-50 align-items-center">
                <div className="col-12" style={{"border-bottom":"2px solid #ff9724"}}>
                    <h1 className="text-center">{props.ita ? "Crea il tuo account":"Create your account"}</h1>
                </div>
                <div style={{padding: 10}}/>
                {error=== "" ? <></> : <Alert variant="danger">{error}</Alert>}
                <Formik
                    initialValues={{ email: '', token: '', privacy:'false'}}
                    validate={values => {
                        const errors = {};
                        if(values.privacy.toString()==="false")
                        {props.ita ? errors.privacy = "Accetta l'informativa sulla privacy per continuare" : errors.privacy="Please, accept the privacy policy"}
                        if (!values.email)
                        {props.ita ? errors.email = "Campo richiesto" : errors.email = 'Required'}
                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
                        {props.ita ? errors.email="Indirizzo email non valido" : errors.email = 'Invalid email address'}
                        if(!values.token)
                        {props.ita ? errors.token = "Campo richiesto" : errors.token = 'Required'}
                        else if (values.token.length < 6)
                        {props.ita ? errors.token = "Token troppo corto, usa almeno 6 caratteri" : errors.token = "Token too short, use at least 6 characters"}
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setLoading(true)
                        setError("");
                        let headers = {headers: {"Authorization" : props.deviceJwt}};
                        API.get("userTokenAPI", "/token/object", headers).then(
                            emails=>{
                                if(emails.filter(e=>e.email===values.email).length!==0 || emails.filter(e=>e.token===values.token).length!==0 ) {
                                    setError(props.ita ? "Esiste già un utente con questa mail o questo token" : "A user with this email or this token already exists")
                                    setLoading(false)
                                }
                                else
                                {
                                    const code = verificationCode()
                                    let init = {
                                        body: {
                                            email: values.email,
                                            token: values.token,
                                            code: code,
                                            active: false,
                                            subscribed: true
                                        },
                                        headers: {Authorization: `Bearer ${props.deviceJwt}`}
                                    }
                                    API.post("userTokenAPI", "/token", init).then(data=>{
                                        console.log("post ok: "+JSON.stringify(data));
                                        setSubmitting(false);
                                        props.doLogin(values.email, values.token)
                                        let verificationLink = "https://paris.prometeo.click/verification?user="+values.email+"&code="+code
                                        let object = props.ita ? "Benvenuto su Promet&o" : "Welcome to Promet&o"
                                        let message = props.ita ?
                                            emailsText["welcome"]["it"][0]+verificationLink+emailsText["welcome"]["it"][1] :
                                            emailsText["welcome"]["en"][0]+verificationLink+emailsText["welcome"]["en"][1]
                                        let init = {
                                            mode:"no-cors",
                                            method:"POST",
                                            headers: {
                                                Accept: "application/json",
                                                "Content-Type":"application/json",
                                                Authorization: `Bearer ${props.deviceJwt}`
                                            },
                                            body: JSON.stringify({"email":values.email, "object": object, "message":message})
                                        }
                                        console.log("init",init)
                                        fetch("https://822240w7r0.execute-api.eu-west-3.amazonaws.com/sampledev/sendEmail",init).then(data=>{
                                            if(props.answers!==null) {
                                                props.answers.user = values.email
                                                let init = {
                                                    body: props.answers,
                                                    headers: {"Authorization": props.deviceJwt}
                                                }
                                                console.log(JSON.stringify(init))
                                                API.post("userTokenAPI", "/survey", init).then(data => {
                                                    console.log("post ok: " + JSON.stringify(data));
                                                    props.setAnswers(null)
                                                    navigate("/thanksEmail")
                                                }).catch(err => console.log("post SURVEY failed: " + JSON.stringify(err)))
                                            }
                                            else
                                                navigate("/thanksEmail")
                                        }).catch(err=>{setLoading(false); console.log("MAIL FAILED",err)})
                                    }).catch(err=>{setLoading(false); console.log("post Token failed: "+JSON.stringify(err))})
                                }
                            }).catch(err=>{setLoading(false); console.log("get failed: "+JSON.stringify(err))})
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit
                      }) => (
                        <form onSubmit={handleSubmit} style={{ paddingLeft:50, paddingRight:50}}>
                            <div style={{"padding-top": 20, "padding-bottom": 20}} className="row align-items-center">
                                <div style={{"text-align": "left"}} className="col-3">
                                    <label htmlFor="email"><h3>E-mail</h3></label>
                                </div>
                                <div className="col-9">
                                    <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} className="form-control" id="email" placeholder="Email"/>
                                    {
                                        errors.email && touched.email && errors.email ?
                                            <small style={{"color": "red", "font-size":"100%"}}>{errors.email && touched.email && errors.email}</small> : null
                                    }
                                </div>
                            </div>
                            <div style={{"padding-top": 20, "padding-bottom": 20}} className="row align-items-center">
                                <div style={{"text-align": "left"}} className="col-3">
                                    <label htmlFor="token"><h3>{props.ita ? "Token Personale" : "Personal Token"}</h3></label>
                                </div>
                                <div className="col-8">
                                    <input type={showPassword ? "text" : "password"} name="token" onChange={handleChange} onBlur={handleBlur} value={values.token} className="form-control" id="token" placeholder={props.ita?"rosso01011970":"red01011970"}/>
                                </div>
                                <div className="col-1">
                                    <img hidden={loading} onClick={togglePassword} style={{width:50, height:50}} src={showPassword ? hide : show}/>
                                    <Spinner animation="border" hidden={!loading}/>
                                </div>
                                <div className="col-3"/>
                                <div className="col-9">
                                    <small style={{"font-size":"120%"}}>{props.ita ? "Crea il tuo token, per esempio il tuo colore preferito seguito dalla tua data di nascita. Usa almeno 6 caratteri" : "Create your token, for example your favourite color followed by your birthday. Use at least 6 characters"}</small><br/>
                                    {
                                        errors.token && touched.token && errors.token ?
                                            <small style={{"color": "red", "font-size":"100%"}}>{errors.token && touched.token && errors.token}</small> : null
                                    }
                                </div>
                                <div className="col-12" style={{paddingTop:20}}>
                                    <input className="form-check-input" name="privacy" onChange={handleChange} onBlur={handleBlur} type="checkbox" id="privacy" value={values.privacy}/>
                                    <label className="form-check-label" htmlFor="privacy">
                                        {props.ita? "Ho letto e compreso l'":"I have read and agreed on PROMET&O's "}<a href="#" onClick={handleShow}>{props.ita?"Informativa sulla Privacy":"Privacy Policy"}</a>{props.ita?" di PROMET&O": ""}
                                    </label>
                                    {errors.privacy&&touched.privacy ? <small style={{"color": "red", "font-size":"100%"}}>{"\t"+errors.privacy} </small> : null}
                                </div>
                                </div>
                            <div style={{"text-align": "center", "padding":"50px"}} className="row align-items-center">
                                <div className="col-12 justify-content-center">
                                    <button id="createButton" style={{width:"25%"}} type="submit" className="btn btn-primary" disabled={loading}>
                                        {props.ita ? "Crea account" : "Create"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
                <div className="row">
                    <p id="prometeoSmallLogo" style={{marginTop:"0px"}}>PROMET&O</p>
                </div>
            </div>
            <PrivacyModal/>
        </div>
    );
}

function verificationCode(){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log("verification: "+result)
    return result;
}
export default CreateAccount