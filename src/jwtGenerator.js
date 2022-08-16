import {API} from "aws-amplify"
export default async function jwtGenerator(username, deviceJwt){

    let init = {
        body: {
            "user": username
        },
        headers: {
            Authorization: `Bearer ${deviceJwt}`
        }
    }
    let res = await API.post("jwt", "/jwt", init)
        .then(data=> {
            return {
                jwt:data.jwt,
                exp:(Date.now()/1000)+3600
            }
        })
        .catch(err=>{console.log(err); return null})
    return res
}