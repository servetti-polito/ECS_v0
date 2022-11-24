import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {useState} from "react";
import {Alert, Spinner} from "react-bootstrap";
import hide from "./resources/images/eye_closed.png"
import show from "./resources/images/eye_open.png"
import "./CSS/Login.css"
import "./CSS/App.css"

function Login(props) {

    const navigate = useNavigate();
    const routeHome = () => navigate("/");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        let curShowPW = showPassword
        setShowPassword(!curShowPW)
    }

    return (
        <div className="container" style={{"padding":"50px"}} >
            <div classname="row" style={{height:"10%"}}/>
            <div className="row h-75 align-items-center">
                <div className="col-12">
                    <h1 id="loginTitle" className= "text-center">{props.ita ? "Accedi" : "Login"}</h1>
                </div>
                {error=== "" ? <></> : <Alert variant="danger">{error}</Alert>}
                {localStorage.getItem("sessionExpired")=== "true" ? <Alert variant="warning">{props.ita?"Sessione scaduta":"Session expired"}</Alert>:null}
                    <Formik
                        initialValues={{ token: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.token)
                            {props.ita ? errors.token = "Campo richiesto" : errors.token = 'Required'}
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            localStorage.removeItem("sessionExpired")
                            setLoading(true)
                            setError("");
                            const init={
                                body: {
                                    token:values.token
                                }
                            }
                            API.post("userTokenAPI", "/token", init).then(user=>{
                                let myjwt = user["jwt"]
                                console.log("test: "+JSON.stringify(user))
                                console.log(user["email"]+"+"+user["token"])
                                    if(user.email===null)
                                    {
                                        setError(props.ita ? "Si è verificato un errore" : "An error occourred");
                                        setLoading(false)
                                    }
                                    else {
                                        console.log("user email: " + user.email)
                                        props.doLogin(user.email, user.token, myjwt).then(
                                            ()=>{
                                                setSubmitting(false);
                                                setLoading(false)
                                                navigate("/");
                                            }
                                        )
                                    }
                            }).catch(err=>console.log("login fail:",err))
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
                            <form onSubmit={handleSubmit}>
                                <div style={{"padding-top": 20, "padding-bottom": 20}} className="row align-items-center">
                                    <div className="col-3">
                                        <label htmlFor="token"><h3>{props.ita ? "Token Personale":"Personal Token"}</h3></label>
                                    </div>
                                    <div className="col-6">
                                        <input type={showPassword ? "text" : "password"} name="token" onChange={handleChange} onBlur={handleBlur} value={values.token} className="form-control" id="token" placeholder={props.ita?"rosso01011970":"red01011970"}/>
                                    </div>
                                    <div className="col-3">
                                        <img hidden={loading} onClick={togglePassword} style={{width:50, height:50}} src={showPassword ? hide : show}/>
                                        <Spinner animation="border" hidden={!loading}/>
                                    </div>
                                    <div className="col-3"/>
                                    <div className="col-6">
                                        {
                                            errors.token && touched.token && errors.token ?
                                                <small style={{"color": "red", "font-size":"150%"}}>{errors.token && touched.token && errors.token}</small> : null
                                        }
                                        <p>{props.ita ? "Non hai un account? ":"You don't have an account? "}<a href="#" onClick={()=>navigate("/createAccount")}>{props.ita?"Registrati":"Sign in"}</a></p>
                                    </div>
                                </div>
                                <div style={{"text-align": "center", "padding":"100px"}} className="row align-items-center">
                                    <div className="col-6 justify-content-center">
                                        <button type="button" style={{"width":"50%"}} onClick={routeHome} className="btn btn-secondary" disabled={loading}>
                                            Home
                                        </button>
                                    </div>
                                    <div className="col-6 justify-content-center">
                                        <button style={{"width":"50%"}} type="submit" className="btn btn-primary" disabled={loading}>
                                            {props.ita ? "Accedi" : "Submit"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                <div className="row">
                    <p id="prometeoSmallLogo" style={{marginTop:"105px"}}>PROMET&O</p>
                </div>
                </div>
        </div>
    );
}

export default Login