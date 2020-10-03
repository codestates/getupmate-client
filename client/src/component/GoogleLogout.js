import React from 'react';
import { GoogleLogout } from 'react-google-login';
const clientId = "1078450474633-28lil3fd23q2pqsh3sh0iqeffddee9lm.apps.googleusercontent.com";
function G_logout(props) {
    const Success = (res) => {
        console.log("Success Logout");
    }
    const Fail = (res) => {
        console.log("fail : ",res)
    }
const { signoutHandler } = props;
    return(
        <div onClick={signoutHandler}>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onSuccess={Success}
                onFailure={Fail}
            />
        </div>
    )
}
export default G_logout