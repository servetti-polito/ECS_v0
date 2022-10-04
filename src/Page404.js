function Page404(props)
{
    return (
        <div className="container">
            <div className="row h-75 align-items-center">
                <div className="col-12">
                    <h1 class="text-center" id="err404"> {props.ita ? "404:Pagina non trovata" : "404: Page Not Found" } </h1><br/>
                    {props.noNavigation ? null : <h1 class="text-center" ><a id="err404" href="./">{props.ita ? "Torna alla home" : "Return to home"}</a></h1>}
                </div>
            </div>
            <p id="prometeoSmallLogo" style={{marginTop:"140px"}}>PROMET&O</p>
        </div>
    );
}

export default Page404;