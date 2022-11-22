/*import {API} from "aws-amplify"
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
}*/
import * as jose from 'jose' //jwt
export default async function jwtGenerator(username){
    const alg = 'RS256'
    const pkcs8 = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCexMb6+leTU8wC
ldXxdUcphOOhlvgrNxJOGp0h4kZAR9VIyMMvSxtQwPPRJBfyqe+ug0SvrQhwh4xO
vWYMwE7+o+4SCeKItu+4bnBppEmpU+FRd4QcM1b+D97uJCpOD4e8LU3oDkBO6Xne
mjTQGjHVZbuKiKcmaYx4f+hcwp3U8E49zjyxnpknw4Y7C2GAs/OhPJkVoHJMZmsP
sAjLaKtbxeyKTtG2GzuLOtWTm9kGX8J+t3nuF4ZS1m0QhXUmE9DAcv/ymxesQVfE
wCWBpCOrFnphroIFgQYjx9vZIudm4k4fw3HmQIj0iaV93bY40AFKTSHCMJ71F41i
63zfyelZAgMBAAECggEAVEgVcQoQD09+jyjHR8SAIFRBGniwCRDVEM0j+ObLcDgx
ys94fdSbDYVAaReF9vWrHLLmdXOfdU0feHUmhUJZLOgM61p//R9PplJKLmpeCBtV
ExAk+2ttlLUMHNLp+kJYRdau8q8OCFX8seSegJJHPgchRWtBgCyruxP7X7KYYn7N
rD2agg94wKFVpt59HyWsmVz82aVWj5zeTL+z2WNNhi5Mwoj3qO2DXiKPLUeQuh+6
iiwf9tgMejBGUOc4kbp/ApJcRELmA4SGF37wPX/Er4lRXY4kyVl/Ss4Y8isDAbr0
lMH6Sd63qJNVJyLlPUUWkNSrc2X1QoPBWpv8Q+qgAQKBgQDt8SOc+BJ8uyWgm7WH
yQe649SnJKqoWz98lr5cZqkP+Igt9mSO76MKUI+3bizu8yJw44wi8j/522bMpaJH
smjx4Xn/B0pm3EhMp1wy54xA7wIR0QzwPCFubPRiZBdcHgZ4MYd/MdKIU66KY/W+
wTeOio+rHko9px2RJ/ScLN/fWQKBgQCq0WsDGHimO3n8WABrSOSalbAwSr8R6kxX
q+TSOPyaCZodhmCoGgm5rADsFKLGzRSyAJuZXUwJqUbMXj/AJIMk8eNzsQcedvnX
S+rnQIL6oBLP+VhlCU0pkiQyxSY7WhAjG6V12RT/jyiuNSWN1Aee5nN6yjZYw+y9
tdrow7MaAQKBgBKRMJA9I2QsTmFcBSxVWY8R3DQ2vkJo7GlScgRP1n1yjV3YzjwB
Ix3Y734G0ObMfjGE8BiCAtACeOEbQ7CIkXvedmCaNwoTwmiI3r7yJpWikOzG/VV5
u7ocMm3DFbeQeDzE0KfyQVV2Aja2WiTKewVadp+Ju41YDwyWq5XMQqPxAoGAC2fg
VVyU8cSW6JqXrJI5cXj9Qrw69d9HKbN4m/DiLQbnG4GVgqP6ckNh7GGUXOHkt94C
hcMNCLgc2hiQ+St29kiQf3EaoJYhKJcRIE/WbxWxK+HiXRy54kS31gwD+YKSAUYf
Tjcoh8fvV3KFB2tY9us8Wr6V0meCr0gtTc2DcAECgYEAotwWfwkF3RIKhPejARZG
+1NlHJR7e1iMx4w48mGrdxbfX+84xuhcBm4Pe4dApJpQneZB20HBnopYQU3XjZs0
W7jGUjqsFagKrwFIw0shbUjqOmwQndRQsHnnAYZPQoQMgHVe4jvq27GNwLQWeKRH
W1gLl83nLUO0fSuejuxjMpw=
-----END PRIVATE KEY-----`

    const privateKey = await jose.importPKCS8(pkcs8, alg)
    const jwt = await new jose.SignJWT({})
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('prometeo.click')
        .setAudience(username)
        .setExpirationTime('2h')
        .sign(privateKey)
    console.log("JOSE NS01: "+jwt)
    return jwt
}