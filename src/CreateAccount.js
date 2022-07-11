import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import UserPool from "./UserPool";

function CreateAccount(props) {

    const navigate = useNavigate();
    const routeHome = () => navigate("/");

    return (
        <div className="container">
            <div className="row h-25" />
            <div className="row h-50 align-items-center">
                <div className="col-12" style={{"padding":"50px"}}>
                    <h1 className="display-1 text-center">{props.ita ? "Registrati":"Sign in"}</h1>
                </div>
                <Formik
                    initialValues={{ email: '', token: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email)
                        {props.ita ? errors.email = "Campo richiesto" : errors.email = 'Required'}
                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
                        {props.ita ? errors.email="Indirizzo email non valido" : errors.email = 'Invalid email address'}
                        if(!values.token)
                        {props.ita ? errors.token = "Campo richiesto" : errors.token = 'Required'}
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            UserPool.signUp(values.email, values.token, [], null,
                                (err, data )=>{
                                    if(err)
                                        console.log(err);
                                    console.log(data);
                                })
                            setSubmitting(false);
                        }, 400);
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
                                <div style={{"text-align": "right"}} className="col-3">
                                    <label htmlFor="email"><h3>Email*</h3></label>
                                </div>
                                <div className="col-9">
                                    <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} className="form-control" id="email" placeholder="Email"/>
                                    {
                                        errors.email && touched.email && errors.email ?
                                            <small style={{"color": "red"}}>{errors.email && touched.email && errors.email}</small> : null
                                    }
                                </div>
                            </div>
                            <div style={{"padding-top": 20, "padding-bottom": 20}} className="row align-items-center">
                                <div style={{"text-align": "right"}} className="col-3">
                                    <label htmlFor="token"><h3>Personal Token*</h3></label>
                                </div>
                                <div className="col-9">
                                    <input type="text" name="token" onChange={handleChange} onBlur={handleBlur} value={values.token} className="form-control" id="token" placeholder="Smith19701231"/>
                                    <small>{props.ita ? "Il cognome da nubile di tua madre + la tua data di nascita (yyyymmdd)" : "Your mother's maiden surname + your date of birth (yyyymmdd)"}</small><br/>
                                    {
                                        errors.token && touched.token && errors.token ?
                                            <small style={{"color": "red"}}>{errors.token && touched.token && errors.token}</small> : null
                                    }
                                </div>
                            </div>
                            <div style={{"text-align": "center", "padding":"50px"}} className="row align-items-center">
                                <div className="col-6 justify-content-center"><button style={{width:"50%"}} onClick={routeHome} className="btn btn-secondary">Home</button></div>
                                <div className="col-6 justify-content-center"><button style={{width:"50%"}} type="submit" className="btn btn-primary">{props.ita ? "Registrati" : "Sign in"}</button></div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CreateAccount