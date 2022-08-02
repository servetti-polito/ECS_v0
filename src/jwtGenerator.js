import CryptoJS from "crypto-js";

const secret = "V1v1mo_In_Un_M0nd0_Crepuscolare.";
const duration = 3600 //in secondi

export default function jwtGenerator(username){
    let header = {
        "alg": "HS256",
        "typ": "JWT"
    };
    let iat = Date.now()/1000;
    let data = {
        "iat": iat,
        "exp": iat+duration,
        "username": username
    };
    let stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    let encodedHeader = base64url(stringifiedHeader);
    let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    let encodedData = base64url(stringifiedData);
    let token = encodedHeader + "." + encodedData;
    let signature = CryptoJS.HmacSHA256(token, secret);
    signature = base64url(signature);
    /*return {
        jwt: token + "." + signature,
        exp: iat+duration
    };*/
    return token+"."+signature;
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
}