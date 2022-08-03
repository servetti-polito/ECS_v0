import React from "react";
import {Outlet} from "react-router-dom";
import Page401 from "./Page401";

export default function ProtectedRoute (/*{component: Component, ...rest}*/ props) {
    if(localStorage.getItem("loading")==="true")
        return(<div className="container">
            <div className="row h-100 align-items-center">
                <div className="col-12">
                    <h1 className="text-center"> Loading... </h1>
                </div>
            </div>
        </div>);

    return props.logged ? <Outlet/> : <Page401/>;
}