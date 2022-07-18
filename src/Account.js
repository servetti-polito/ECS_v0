import React, {createContext} from "react";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import Pool from "./UserPool";

const AccountContext = createContext();
const Account = (props) =>{
    const getSession = async () => {
        return new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if(user)
            {
                user.getSession((err, session)=>{
                    if(err) { reject(err);}
                    else { resolve(session);}
                })
            }
            else {reject();}
        })
    }

    const authenticate = async (Username, Password) => {
        return new Promise((resolve, reject)=>{
            const user = new CognitoUser({Username, Pool})
            const authDetails = new AuthenticationDetails({Username, Password})
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("Successful login")
                    resolve(data)
                },
                onFailure: (err)=>{
                    console.log("Login failed miserably: "+err)
                    reject(err)
                }
            });
        })
    }
    return (<AccountContext.Provider value={{authenticate, getSession}}>
        {props.children}
    </AccountContext.Provider>);
}

export {Account, AccountContext};