function Page404()
{
    return (
        <div className="container">
            <div className="row h-75 align-items-center">
                <div className="col-12">
                    <h1 class="text-center" id="err404"> 404: Page Not Found</h1><br/>
                    <h1 class="text-center" ><a id="err404" href="./">Return to home</a></h1>
                </div>
            </div>
        </div>
    );
}

export default Page404;