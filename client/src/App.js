import React from 'react';
import Signin from './component/Signin';
import Signup from './component/Signup';
import MyPage from './component/MyPage';
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
      isLogin: true
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
        <Switch >
          <Route path="/signin" render={() => {
            if (isLogin) {
              return <Redirect to="/" />
            }
            return <Signin isLogin={isLogin} isLoginHandler={this.isLoginHandler.bind(this)} setNicknameHandler={this.setNicknameHandler.bind(this)} />
          }} />
          <Route exact path="/signup" render={() => {
            return <Signup />
          }} />
          <Route exact path="/mypage" render={() => {
            return <MyPage nickname={this.state.nickname} />
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
