import React from "react";
import './Signup.css';
import { withRouter } from "react-router-dom";

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nickName: "",
            email: "",
            password: "",
            passwordCheck: ""
        }
        this.validate.bind(this);
    }


    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            return false;
        }
        else {
            console.log("Email is Correct");
            return true;
        }
    }

    onChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signUpBtnHandelr() {
        const { password, passwordCheck, email, nickName } = this.state;
        console.log(password, passwordCheck)

        if (this.validate(email) && (password === passwordCheck)) {
            fetch("http://54.180.92.83:3000/user/signup", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    nickname: nickName
                })
            }).then((res) => res.json())
                .then((data) => console.log(data))
                .then(() => {
                    this.setState({
                        nickName: "",
                        email: "",
                        password: "",
                        passwordCheck: ""
                    })
                })
                .then(() => {
                    this.props.history.push('/')
                })

        } else {
            this.validate(email) ? console.log(true) : alert("유효하지 않은 이메일입니다");
            (password === passwordCheck && password !== "") ? console.log(true) : alert("비밀번호가 일치하지 않습니다");
        }
    }


    render() {

        return (

            <div className="user Signup">
                <h2>Signup</h2>
                <div className="Signup_input">
                    <input type="text" placeholder="nickName" onChange={this.onChangeHandler.bind(this)} name="nickName" />
                    <input type="text" placeholder="email" onChange={this.onChangeHandler.bind(this)} name="email" />
                    <input type="password" placeholder="password" onChange={this.onChangeHandler.bind(this)} name="password" />
                    <input type="password" placeholder="password 확인" onChange={this.onChangeHandler.bind(this)} name="passwordCheck" />
                    <button onClick={this.signUpBtnHandelr.bind(this)}>SignUp</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Signup);

