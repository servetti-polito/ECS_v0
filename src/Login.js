import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";

function Login(props) {

    const navigate = useNavigate();
    const routeHome = () => navigate("/");

    return (
        <div className="container" style={{"padding":"50px"}} >
            <div style={{"padding":"50px"}} />
            <div className="row h-75 align-items-center">
                <div className="col-12" style={{"padding":"50px"}}>
                    <h1 className="display-1 text-center">Login</h1>
                </div>
                    <Formik
                        initialValues={{ token: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.token)
                            {props.ita ? errors.token = "Campo richiesto" : errors.token = 'Required'}
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            API.get("userTokenAPI", "/token/email", {
                                TableName: "userToken",
                                KeyConditionExpression: "token = :t",
                                ExpressionAttributeValues: {
                                    ":t": values.token
                                }
                            }).then(data=>console.log("get ok: ", data)).catch(err=>console.log("get fail:",err))
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