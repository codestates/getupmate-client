import React from 'react';
import { GoogleLogin } from 'react-google-login';
import profile_pic from '../profile_pic.png';
const clientId = "1078450474633-28lil3fd23q2pqsh3sh0iqeffddee9lm.apps.googleusercontent.com";
function G_Login(props) {
    const Success = async (res) => {
        const profile = res.profileObj;
        console.log("Success! : ",res.profileObj);
        await fetch('http://www.gijigae.com:3000/user/googleLogin', {
            method : 'POST',
            headers: {
                "content-type": "application/json"
            },
            body : JSON.stringify({
                email: profile.email,
                name : profile.name,
                photo : profile.imageUrl
            })
        })
        .then(result => result.json())
        .then(async (json) => {
            const isLoginHandler = props.isLoginHandler;
            const setUserHandler = props.setUserHandler;
            console.log('json : ',json);
            let findImg = await fetch(`http://www.gijigae.com:3000/upload/${json.id}-photo.jpeg`);
            if (findImg.status === 404) {
              setUserHandler(json.id, json.email, profile_pic, json.nickname)
              window.sessionStorage.setItem('photo', profile_pic);
            } else {
              setUserHandler(json.id, json.email, findImg.url, json.nickname)
              window.sessionStorage.setItem('photo', findImg.url);
            }
            window.sessionStorage.setItem('id', json.id);
            window.sessionStorage.setItem('email', json.email);
            window.sessionStorage.setItem('nickname', json.nickname);
            isLoginHandler();
        })
    }
    const onFailure = (res) => {
        console.log("Fail : ",res);
    }
    return(
        <div className="GoogleLogin">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={Success}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}
export default G_Login