import template from './resources/GrafanaReqTemplate.json';

export default function fetchData (from,to)
{
    console.log("IVE BEEN INVOKED")
    template.from=""+from;
    template.to=""+to;
    let init = {
        method:"POST",
        mode:"no-cors",
        headers:{
            "Content-Type":"application/json",
            "Host":"dev.prometeo.click"
        },
        body:JSON.stringify(template)
    }
    console.log("INIT",JSON.stringify(init))
    return fetch("https://dev.prometeo.click/chart/api/ds/query", init).then(result=>{
        console.log("ALL GOOD")
        return result;
    }).catch(e=>console.log("ERROR",JSON.stringify(e)))
}