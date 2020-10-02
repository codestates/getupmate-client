import React from 'react';
import Signin from './component/Signin';
import Signup from './component/Signup';
import MyPage from './component/MyPage';
import Alarm from "./component/Alarm"
import Friends from './component/Friends';
import Home from './component/Home';
import Tab from "./component/Tab"
import AlarmRing from "./component/AlarmRing";
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
      isAlarm: false,
      curAlarm_num: null,
      question: ''
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

  isAlarmHandler() {
    // 알람 켤 때
    if (this.state.isAlarm === false) {
      this.setState({
        ...this.state,
        isAlarm: true
      })
    }
    // 알람 끌 때 ---> makefeed 요청하기
    else {
      this.makeFeedHandler()
      this.setState({
        ...this.state,
        isAlarm: false
      })
    }
  }

  setQuestionHandler(value) {
    this.setState({
      ...this.state,
      question: value
    })
  }

  makeFeedHandler() {
    console.log((new Date().toLocaleTimeString('it-IT')).slice(0, 5), "mission complete!")
    let time;
    let now = new Date();
    let nowHour = now.getHours();
    let nowMin = now.getMinutes();
    if (nowHour <= 12 && nowHour >= 6) {
      time = `오전 ${nowHour}시 ${nowMin}분`
    } else if (nowHour >= 12 && nowHour < 22) {
      time = `오후 ${nowHour - 12}시 ${nowMin}분`
    } else if (nowHour >= 22 && nowHour <= 24) {
      time = `밤 ${nowHour - 12}시 ${nowMin}분`
    } else {
      time = `새벽 ${nowHour}시 ${nowMin}분`
    }
    let text = `${this.state.nickname}님이 ${this.state.question}를 풀어서
                ${time}에 기상하셨습니다.`
    fetch(`http://www.gijigae.com:3000/feed/makefeed/${this.state.id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        text: text
      })
    })
      .then(res => res.json())
      .then(json => console.log(json))
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

  curAlarm_numHandler(value) {
    this.setState({
      ...this.state,
      curAlarm_num: value
    })
  }

  render() {
    const { isLogin, isAlarm, curAlarm_num, id, question } = this.state
    return (
      <div className="App">
        <Tab isLogin={isLogin} />
        <AlarmRing
          isAlarm={isAlarm}
          isAlarmHandler={this.isAlarmHandler.bind(this)}
          curAlarm_num={curAlarm_num}
          id={id}
          setQuestionHandler={this.setQuestionHandler.bind(this)}
        />
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
              return <Home
                id={this.state.id}
                nickname={this.state.nickname}
              />
            }
            return <Redirect to="/signin" />
          }} />
          <Route exact path="/alarm" render={() => {
            if (isLogin) {
              return <Alarm id={this.state.id} isAlarmHandler={this.isAlarmHandler.bind(this)} curAlarm_num={curAlarm_num} curAlarm_numHandler={this.curAlarm_numHandler.bind(this)} />
            }
            return <Redirect to="/signin" />
          }} />
          <Route exact path="/friends" render={() => {
            if (isLogin) {
              return <Friends id={id} />
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
