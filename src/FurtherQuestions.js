import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

export default function FurtherQuestions(props){
    let navigate = useNavigate();
    const routeHome = () => {
        navigate("/")
    }

    return (
        <div className="container">
            <div className="row h-75 align-items-center">
                <div className="col-12">
                    <h1 className="display-1 text-center">Thanks for completing the survey</h1>
                    <h3 className="text-center">Do you have time to answer a few more questions?</h3>
                </div>
                <div className="row gap-2">
                    <div style={{"text-align": "center"}} className="row align-items-center">
                        <div className="col-6 justify-content-center"><button onClick={routeHome} className="btn btn-lg btn-secondary">No</button></div>
                        <div className="col-6 justify-content-center"><button disabled className="btn btn-lg btn-primary">Yes</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}