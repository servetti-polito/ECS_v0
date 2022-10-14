import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-west-3_rMtCV6Oho",
    ClientId: "40gqtif2ukr91bom358nvtv8v3"
}

export default new CognitoUserPool(poolData);