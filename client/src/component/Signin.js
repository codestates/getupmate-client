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

  onClickSignin() {
    const { isLoginHandler, setUserHandler } = this.props;
    fetch('http://www.gijigae.com:3000/user/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("signin json:", json)

        console.log("signin json.photo buffer:", Buffer.from(json.photo))
        let imgsrc = `http://www.gijigae.com:3000/upload/${Buffer.from(json.photo).toString('utf8')}`
        console.log("imgsrc:", imgsrc);

        // signin하면서 App.js의 state 업데이트
        setUserHandler(json.id, json.email, imgsrc, json.nickname)
        window.sessionStorage.setItem('id', json.id);
        window.sessionStorage.setItem('email', json.email);
        window.sessionStorage.setItem('photo', imgsrc);
        window.sessionStorage.setItem('nickname', json.nickname);
        // login: false->true
        isLoginHandler()
      })
      .catch((err) => {
        alert('등록되지 않은 유저입니다.')
      });
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