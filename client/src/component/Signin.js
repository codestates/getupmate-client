import React from 'react';
import './Signin.css'
import { withRouter, Link } from "react-router-dom";
import profile_pic from '../profile_pic.png';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async onClickSignin() {
    const { isLoginHandler, setUserHandler } = this.props;
    let findUser = await fetch('http://www.gijigae.com:3000/user/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    let user = await findUser.json();
    // console.log('user : ', user);
    let findImg = await fetch(`http://www.gijigae.com:3000/upload/${user.id}-photo.jpeg`);
    // console.log('img : ', findImg);
    if (findImg.status === 404) {
      setUserHandler(user.id, user.email, profile_pic, user.nickname)
      window.sessionStorage.setItem('photo', profile_pic);
    } else {
      setUserHandler(user.id, user.email, findImg.url, user.nickname)
      window.sessionStorage.setItem('photo', findImg.url);
    }
    window.sessionStorage.setItem('id', user.id);
    window.sessionStorage.setItem('email', user.email);
    window.sessionStorage.setItem('nickname', user.nickname);
    // login: false->true
    isLoginHandler()
  }


  onClickSignUp() {
    this.props.history.push("/signup");
  }
  
  onClickSocialLogin(){
    fetch('https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Fwww.gijigae.com%3A3000%2Fauth%2Fgoogle%2Fcallback&scope=profile+email&client_id=317692737791-h4rfsfpnp9k27e1rto3mq0jd412uvgfq.apps.googleusercontent.com&flowName=GeneralOAuthFlow')
    .then(() => console.log(JSON.parse(document.querySelector("body").textContent)));
  }



  render() {
    return (
      <div className="signin">
        <h2>Signin</h2>
        <div className="Signin_input">
          <input
            type="text"
            placeholder="email"
            onChange={this.onChange.bind(this)}
            value={this.state.email}
            name="email"
          />
          <input
            type="password"
            placeholder="password"
            onChange={this.onChange.bind(this)}
            value={this.state.password}
            name="password"
          />
          <div>
            <button
              onClick={this.onClickSignin.bind(this)}
            >Signin</button>
            <button onClick={this.onClickSocialLogin.bind(this)}></button>
            <button
            >Sign up</button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Signin);