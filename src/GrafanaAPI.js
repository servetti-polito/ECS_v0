import template from './resources/GrafanaReqTemplate.json';

export default function fetchData (from,to)
{
    console.log("in fetch data")
    template.from=""+from;
    template.to=""+to;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200)
            return xhttp.responseText
        else if (this.readyState === 4 && this.status !== 200)
            console.log("ERROR "+xhttp.statusText)
    };
    xhttp.open("POST", "https://dev.prometeo.click/chart/api/ds/query", true);
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.setRequestHeader("Host","dev.prometeo.click",)
    xhttp.send(JSON.stringify(template));
    /*let init = {
        method:"POST",
        mode: 'cors',
        headers:{
            "Content-Type":"application/json",
            "Host":"dev.prometeo.click"
        },
        body:JSON.stringify(template)
    }
    console.log("INIT: "+JSON.stringify(init))
    return fetch("https://dev.prometeo.click/chart/api/ds/query", init)
    //return fetch("https://caimano.polito.it:8080/chart/api/ds/query", init)
        .then(result => {
                console.log("RESULT IN FETCH",JSON.stringify(result.json()))
                return result.json();
            },
            rejected=>{
            console.log("Somehow rejected",JSON.stringify(rejected))
        })
        .catch(e=>console.log("ERROR",JSON.stringify(e)))*/
}
