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
    console.log("INIT: "+JSON.stringify(init))
    return fetch("https://dev.prometeo.click/chart/api/ds/query", init)
        .then(result=>{
            console.log("RESULT IN FETCH",JSON.stringify(result))
            return result;
        },
            rejected=>{
            console.log("Somehow rejected",JSON.stringify(rejected))
        })
        .catch(e=>console.log("ERROR",JSON.stringify(e)))
}
