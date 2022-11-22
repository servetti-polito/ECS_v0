import {API} from "aws-amplify"
//import jwt from "jsonwebtoken"
//import * as privateKEY from "./resources/privateKey.txt"
//export default async function jwtGenerator(username, deviceJwt){
export default async function jwtGenerator(username){

    /*let init = {
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
        .catch(err=>{console.log(err); return null})*/
/*    const signOptions = {
        issuer:  "prometeo.click",
        subject:  username,
        expiresIn:  "1h",
        algorithm:  "RS256"
    };
    return jwt.sign({}, privateKEY, signOptions,()=>{
        console.log("err")
    });*/
    return "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjkxNDMzNzQsImV4cCI6MjY2OTE0Njk3NCwiaXNzIjoicHJvbWV0ZW8uY2xpY2siLCJzdWIiOiJtYXJ0aW5hIn0.IBJzHu-01HwU3ihjWV3yIs1usxttpWyZprBFDg_qAFBDJQnDETXxI7nmX5q0VlNOlZOEoqMbqGgaEXMFNXc3lY2Qo8irrAP99IAq9c3QfJ7isUjBXZFQw4wbfLtp1KTOAtEG_k_EnTYueAHnUCI3RmefmfVDlndKBrIrBOsoO7tRAsxAs4rxVYa3shI1JCRAtU3eFHViCJz9pw-IMTWTgeZk5G9ot39STlYF59zet5iMwU9JGbbDSIRe5uU0jSCCUGObCHXVuNrjok8p7v91Yf1kSj5XFJBn0Gfghl5SryUccol6YhHMv22Ar3aclDw2JYwOleKlLCeyHOQQOcuS7A"
}