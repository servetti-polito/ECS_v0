import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-central-1_yZb07J4GF",
    ClientId: "2h55kua4g801b0t6h8jfq0uh4j"
}

export default new CognitoUserPool(poolData);