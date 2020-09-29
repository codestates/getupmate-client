import React from 'react';
import './Signin.css'
import { withRouter, Link } from "react-router-dom";

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
    console.log('user : ', user);
    let findImg = await fetch(`http://www.gijigae.com:3000/upload/${user.id}-photo.jpeg`);
    console.log('img : ', findImg);
    setUserHandler(user.id, user.email, findImg.url, user.nickname)
    window.sessionStorage.setItem('id', user.id);
    window.sessionStorage.setItem('email', user.email);
    window.sessionStorage.setItem('photo', findImg.url);
    window.sessionStorage.setItem('nickname', user.nickname);
    // login: false->true
    isLoginHandler()
  }


  onClickSignUp() {
    this.props.history.push("/signup");
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
            <button>
              <a href="http://www.gijigae.com:3000/auth/google">Login with Google</a></button>
            <button
              onClick={this.onClickSignUp.bind(this)}
            >Sign up</button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Signin);