import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_EDjVEAFzD",
    ClientId: "2aosd0oa4hkfv01b84c6tfah3p"
}

export default new CognitoUserPool(poolData);