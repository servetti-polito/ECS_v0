import React from "react";
import {Outlet, Navigate} from "react-router-dom";

export default function ProtectedRoute ({component: Component, ...rest}) {
    if(localStorage.getItem("loading")==="true")
        return(<div className="container">
            <div className="row h-100 align-items-center">
                <div className="col-12">
                    <h1 className="text-center"> Loading... </h1>
                </div>
            </div>
        </div>);

    return localStorage.getItem("sessionStatus")==="true" ? <Outlet/> : <Navigate to="/page401" />

    /*
    const [status, setStatus] = useState(false);
    const {getSession} = useContext(AccountContext);
    useEffect(()=>{
        getSession().then(()=>{
            console.log("session active"); setStatus(true);
        }).catch(()=>{console.log("session gone"); setStatus(false)});
    },[getSession])*/
    /*if(getSession())
    {
        console.log("status: "+status);
        return <Outlet/>
    }
    else
    {
        console.log("status: "+status);
        return <Navigate to="/page401" />;
    }*/
}