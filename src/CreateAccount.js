import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";

function CreateAccount(props) {

    const navigate = useNavigate();
    const routeHome = () => navigate("/");

    return (
        <div className="container">

            <div className="row h-25 align-items-center">
                <div className="col-12" style={{"padding":"50px"}}>
                    <h1 className="display-1 text-center">{props.ita ? "Registrati":"Sign in"}</h1>
                </div>
                <Formik
                    initialValues={{ name:'', surname:'', email: '', password: '', confirmPassword: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email)
                        {props.ita ? errors.email = "Campo richiesto" : errors.email = 'Required'}
                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
                        {props.ita ? errors.email="Indirizzo email non valido" : errors.email = 'Invalid email address'}
                        if(!values.password)
                        {props.ita ? errors.password = "Campo richiesto" : errors.password = 'Required'}
                        else if (!values.password.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"))
                        {props.ita ? errors.password = "La password deve avere una lettera maiuscola, una lettera minuscola, una cifra, un carattere speciale ed essere almeno di 8 caratteri" : errors.password = 'Your password needs to have at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least eight characters long'}
                        if(!values.confirmPassword)
                        {props.ita ? errors.confirmPassword = "Campo richiesto" : errors.confirmPassword = 'Required'}
                        if(values.confirmPassword !== values.password)
                        {props.ita ? errors.confirmPassword = "La conferma non coincide con la password" : errors.confirmPassword = "The confirmation doesn't match the password"}
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            navigate("/thanksEmail");
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
                                    <label htmlFor="name"><h3>{props.ita ? "Nome" : "Name"}</h3></label>
                                </div>
                                <div className="col-9">
                                    <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} className="form-control" id="name" placeholder={props.ita ? "Nome" :"Name"}/>
                                </div>
                            </div>
                            <div style={{"padding-top": 20, "padding-bottom": 20}} className="row align-items-center">
                                <div style={{"text-align": "right"}} className="col-3">
                                    <label htmlFor="name"><h3>{props.ita ? "Cognome" : "Surname"}</h3></label>
                                </div>
                                <div className="col-9">
                                    <input type="text" name="surname" onChange={handleChange} onBlur={handleBlur} value={values.surname} className="form-control" id="surname" placeholder={props.ita ? "Cognome" : "Surname"}/>
                                </div>
                            </div>
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
                                    <label htmlFor="password"><h3>Password*</h3></label>
                                </div>
                                <div className="col-9">
                                    <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} className="form-control" id="password" placeholder="Password"/>
                                    {
                                        errors.password && touched.password && errors.password ?
                                            <small style={{"color": "red"}}>{errors.password && touched.password && errors.password}</small> : null
                                    }
                                </div>
                            </div>
                            <div style={{"padding-top": 20, "padding-bottom": 20}} className="row align-items-center">
                                <div style={{"text-align": "right"}} className="col-3">
                                    <label htmlFor="confirmPassword"><h3>{props.ita ? "Conferma password" : "Confirm password"}*</h3></label>
                                </div>
                                <div className="col-9">
                                    <input type="password" name="confirmPassword" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} className="form-control" id="confirmPassword" placeholder={props.ita? "Conferma password": "Confirm password"}/>
                                    {
                                        errors.confirmPassword && touched.confirmPassword && errors.confirmPassword ?
                                            <small style={{"color": "red"}}>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</small> : null
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