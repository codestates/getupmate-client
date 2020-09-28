import React from 'react';
import Signin from './component/Signin';
import Signup from './component/Signup';
import MyPage from './component/MyPage';
import Alarm from "./component/Alarm"
import Friends from './component/Friends';
import Home from './component/Home';
import Tab from "./component/Tab"
import './App.css';
import { Switch, Route, Redirect, withRouter } from "react-router-dom"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      id: null,
      nickname: '',
      email: '',
      photo: null,
    }
  }

  componentDidMount() {
    const id = window.sessionStorage.getItem('id');
    if (id) {
      this.setState({
        isLogin: true,
        id: id,
        nickname: window.sessionStorage.getItem('nickname'),
        email: window.sessionStorage.getItem('email'),
        photo: window.sessionStorage.getItem('photo')
      })
      this.props.history.push(window.sessionStorage.getItem('pathname'));
    }
  }

  isLoginHandler() {
    this.setState({
      ...this.state,
      isLogin: !this.state.isLogin
    })
  }

  setUserHandler(id, email, photo, nickname) {
    this.setState({
      ...this.state,
      id: id,
      email: email,
      photo: photo,
      nickname: nickname
    })
  }

  setNicknameHandler(e) {
    this.setState({
      ...this.state,
      nickname: e
    })
  }

  setPhotoHandler(e) {
    this.setState({
      ...this.state,
      photo: e
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
              setUserHandler={this.setUserHandler.bind(this)}
            />
          }} />
          <Route exact path="/signup" render={() => {
            return <Signup />
          }} />
          <Route exact path="/mypage" render={() => {
            if (isLogin) {
              return <MyPage
                isLogin={this.state.isLogin}
                id={this.state.id}
                nickname={this.state.nickname}
                photo={this.state.photo}
                setNicknameHandler={this.setNicknameHandler.bind(this)}
                setPhotoHandler={this.setPhotoHandler.bind(this)}
                isLoginHandler={this.isLoginHandler.bind(this)}
              />
            }
            return <Redirect to="/" />
          }} />
          <Route exact path="/home" render={() => {
            if (isLogin) {
              return <Home />
            }
            return <Redirect to="/signin" />
          }} />
          <Route exact path="/alarm" render={() => {
            if (isLogin) {
              return <Alarm  id={this.state.id}/>
            }
            return <Redirect to="/signin" />
          }} />
          <Route exact path="/friends" render={() => {
            if (isLogin) {
              return <Friends />
            }
            return <Redirect to="/signin" />
          }} />
          <Route path="/" render={() => {
            if (isLogin) {
              return <Redirect to="/home" />
            }
            return <Redirect to="/signin" />
          }} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
