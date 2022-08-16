import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {useState} from "react";
import {Alert, Spinner} from "react-bootstrap";

function Login(props) {

    const navigate = useNavigate();
    const routeHome = () => navigate("/");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const headers = {
        headers: {"Authorization" : props.deviceJwt}
    };

    return (
        <div className="container" style={{"padding":"50px"}} >
            <div style={{"padding":"20px"}} />
            <div className="row h-75 align-items-center">
                <div className="col-12" style={{"padding":"50px"}}>
                    <h1 className="display-1 text-center">Login</h1>
                </div>
                {error=== "" ? <></> : <Alert variant="danger">{error}</Alert>}
                    <Formik
                        initialValues={{ token: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.token)
                            {props.ita ? errors.token = "Campo richiesto" : errors.token = 'Required'}
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setLoading(true)
                            setError("");
                            API.get("userTokenAPI", "/token/email" , headers)
                                .then(data=>{
                                    console.log("get ok: ", data)
                                    let user = data.filter(a=>a.token===values.token);
                                    if(user.length<1)
                                        setError(props.ita ? "Nessun utente corrsiponde a questo token" : "No user has this token");
                                    else if (user.length>1)
                                        setError(props.ita ? "Più utenti usano questo token, contatta l'amministratore" : "More than one user associated to this token, contact administration");
                                    else {
                                        console.log("user email: " + user[0].email)
                                        props.doLogin(user[0].email, user[0].token)
                                        setSubmitting(false);
                                        setLoading(false)
                                        navigate("/");
                                    }
                            }).catch(err=>console.log("get fail:",err))
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
                                        <label htmlFor="token"><h3>Token</h3></label>
                                    </div>
                                    <div className="col-9">
                                        <input type="text" name="token" onChange={handleChange} onBlur={handleBlur} value={values.token} className="form-control" id="token" placeholder="Smith19701231"/>

                                        {
                                            errors.token && touched.token && errors.token ?
                                            <small style={{"color": "red"}}>{errors.token && touched.token && errors.token}</small> : null
                                        }
                                    </div>
                                </div>
                                <div style={{"text-align": "center", "padding":"100px"}} className="row align-items-center">
                                    <div className="col-6 justify-content-center">
                                        <button style={{"width":"50%"}} onClick={routeHome} className="btn btn-secondary" disabled={loading}>
                                            Home
                                        </button>
                                    </div>
                                    <div className="col-6 justify-content-center">
                                        <button style={{"width":"50%"}} type="submit" className="btn btn-primary" disabled={loading}>
                                            {loading? <Spinner animation="border" hidden={!loading}/> : props.ita ? "Accedi" : "Submit"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
        </div>
    );
}

export default Login