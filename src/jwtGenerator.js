import CryptoJS from "crypto-js";
import {API} from "aws-amplify"

const secret = "V1v1mo_In_Un_M0nd0_Crepuscolare.";
const duration = 3600 //in secondi


export default async function jwtGenerator(username, deviceJwt){

    let init = {
        body: {user: username},
        headers: {
            Authorization: `Bearer ${deviceJwt}`
        }
    }
    let res = await API.get("jwt", "/jwt", init)
        .then(data=> {
            return {
                jwt:data.jwt,
                exp:(Date.now()/1000)+3600
            }
        })
        .catch(err=>{console.log(err); return null})
    return res
}
 /*   let header = {
        "alg": "RS256",
        "kid":'this-is-a-test-kid',
    };
    let iat = Date.now()/1000;
    let data = {
        "iat": iat,
        "exp": iat+duration,
        "sub": username,
    };
    let stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    let encodedHeader = base64url(stringifiedHeader);
    let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    let encodedData = base64url(stringifiedData);
    let token = encodedHeader + "." + encodedData;
    let signature = //get from API
    signature = base64url(signature);
    return {
        jwt: token + "." + signature,
        exp: iat+duration
    };
}

function base64url(source) {
    // Encode in classical base64
    let encodedSource = CryptoJS.enc.Base64.stringify(source);
    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');
    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
}*/