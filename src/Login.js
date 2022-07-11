import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";

function Login(props) {

    const navigate = useNavigate();
    const routeHome = () => navigate("/");

    return (
        <div className="container">
            <div style={{"padding":"50px"}} />
            <div className="row h-75 align-items-center">
                <div className="col-12" style={{"padding":"50px"}}>
                    <h1 className="display-1 text-center">Login</h1>
                </div>
                //TODO: sostituire username e password con token = cognome da nubile di tua madre + data di nascita (yyyymmdd)
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email)
                            {props.ita ? errors.email = "Campo richiesto" : errors.email = 'Required'}
                            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
                            {props.ita ? errors.email="Indirizzo email non valido" : errors.email = 'Invalid email address'}
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                props.doLogin(values.email);
                                navigate("/survey");
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
                                    <div className="col-3">
                                        <label htmlFor="email"><h3>Email</h3></label>
                                    </div>
                                    <div className="col-9">
                                        <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} className="form-control" id="email" placeholder="Enter email"/>
                                        {
                                            errors.email && touched.email && errors.email ?
                                            <small style={{"color": "red"}}>{errors.email && touched.email && errors.email}</small> : null
                                        }
                                    </div>
                                </div>
                                <div style={{"padding-top": 20, "padding-bottom": 20}} className="row align-items-center">
                                    <div className="col-3">
                                        <label htmlFor="password"><h3>Password</h3></label>
                                    </div>
                                    <div className="col-9">
                                        <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} className="form-control" id="password" placeholder="Password"/>
                                        {
                                            errors.password && touched.password && errors.password ?
                                                <small style={{"color": "red"}}>{errors.password && touched.password && errors.password}</small> : null
                                        }
                                    </div>
                                </div>
                                <div style={{"text-align": "center", "padding":"100px"}} className="row align-items-center">
                                    <div className="col-6 justify-content-center"><button style={{"width":"50%"}} onClick={routeHome} className="btn btn-secondary">Home</button></div>
                                    <div className="col-6 justify-content-center"><button style={{"width":"50%"}} type="submit" className="btn btn-primary">{props.ita ? "Accedi" : "Submit"}</button></div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
        </div>
    );
}

export default Login