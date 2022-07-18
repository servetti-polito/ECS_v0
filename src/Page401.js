function Page401(props)
{
    return (
        <div className="container">
            <div className="row h-75 align-items-center">
                <div className="col-12">
                    <h1 class="text-center" id="err404">{props.ita ? "401: Non autorizzato" : "401: Unauthorized"}</h1><br/>
                    <h1 class="text-center">{props.ita ? "Scansiona un url valido" : "Scan a valid url"}</h1>
                </div>
            </div>
        </div>
    );
}

export default Page401;