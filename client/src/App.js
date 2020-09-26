import React from 'react';
import Signin from './component/Signin';
import Signup from './component/Signup';
import MyPage from './component/MyPage';
import Alarm from "./component/Alarm"
import Tab from "./component/Tab"
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      nickname: null || "nickname_example"
    }
  }

  isLoginHandler() {
    this.setState({
      ...this.state,
      isLogin: !this.state.isLogin
    })
  }

  setNicknameHandler(e) {
    this.setState({
      ...this.state,
      nickname: e
    })
  }

  render() {
    const { isLogin } = this.state
    return (
      <div className="App">
        <Tab isLogin={isLogin} />
        <Switch >
          <Route path="/signin" render={() => {
            if (isLogin) {
              return <Redirect to="/" />
            }
            return <Signin
              isLogin={isLogin}
              isLoginHandler={this.isLoginHandler.bind(this)}
              setNicknameHandler={this.setNicknameHandler.bind(this)}
            />
          }} />
          <Route exact path="/signup" render={() => {
            return <Signup />
          }} />
          <Route exact path="/mypage" render={() => {
            if (isLogin) {
              return <MyPage nickname={this.state.nickname} />
            }
            return <Redirect to="/" />
          }} />
          <Route exact path="/home" render={() => {
            if (isLogin) {
              // 홈(팔로잉+나의 피드)페이지 생기면 그때 수정
              return <MyPage />
            }
            return <Redirect to="/signin" />
          }} />
          <Route exact path="/alarm" render={() => {
            if (isLogin) {
              return <Alarm />
            }
            return <Redirect to="/signin" />
          }} />
          <Route exact path="/friends" render={() => {
            if (isLogin) {
              return <MyPage />
            }
            return <Redirect to="/signin" />
          }} />
          <Route path="/" render={() => {
            if (isLogin) {
              return <Redirect to="/mypage" />
            }
            return <Redirect to="/signin" />
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
