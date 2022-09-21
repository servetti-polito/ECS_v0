import template from './resources/GrafanaReqTemplate.json';

export default function fetchData (from,to)
{
    template.from=""+from;
    template.to=""+to;
    let init = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Host":"dev.prometeo.click"
        },
        body:JSON.stringify(template)
    }
    return fetch("https://dev.prometeo.click/chart/api/ds/query", init).then(result=>{
        return result;
    }).catch(e=>console.log("ERROR",JSON.stringify(e)))
}