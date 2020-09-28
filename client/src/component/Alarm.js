import React from "react"
import "./Alarm.css"
import { withRouter } from "react-router-dom"

class Alarm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isAdd: false,
      time: "",
      question: "따라쓰기",
      curTime: null
    }
    window.sessionStorage.setItem('pathname', this.props.location.pathname);
  }

  componentDidMount() {
    fetch(`http://54.180.92.83:3000/alarm/${this.props.id}`)
      .then((res) => res.json())
      .then((data) => this.setState({
        ...this.state,
        data: data
      }))

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );

    this.interval = setInterval(
      () => this.checkAlarmClock(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      ...this.state,
      curTime: new Date().toLocaleTimeString('it-IT', { hour12: false })
    })
  }

  clickBtnHandler(e) {
    console.log(this.state.question);
    if (e.target.value === "확인") {
      fetch(`http://54.180.92.83:3000/alarm/${this.props.id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          question: this.state.question,
          time: this.state.time
        })
      }).then((res) => res.json)
        .then((data) => console.log(data));
    }

    this.setState((curState) => {
      return {
        ...this.state,
        isAdd: !curState.isAdd
      }
    })
  }

  onChangeHandler(e) {
    // console.log(typeof(e.target.value)); string으로 나온다 .
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  setAlarmTime(e) {
    e.preventDefault();
    const inputAlarmTime = e.target.value + ":00"
    this.setState({
      ...this.state,
      time: inputAlarmTime
    })
  }

  checkAlarmClock() {
    this.state.data && this.state.data.map((cur) => {
      const { time } = cur;
      if (time === this.state.curTime) {
        alert(`it's time`);
      }
    })
  }

  render() {
    const { data, isAdd } = this.state;
    return (
      <div className="alarm_css">
        <h2>Alarm</h2>
        <div className="alarm">
          {
            data && data.map((data) => {
              const { id, time, question } = data;
              return (
                <li key={id}>
                  <div>
                    <span className="time">{time}</span>
                    <label className="switch">
                      <input type="checkbox" onClick={() => { console.log('hi!') }} />
                      <span className="slider"></span>
                    </label>
                    <button className="delete">&#10060;</button>
                    <span className="question">{question}</span>
                  </div>
                </li>
              )
            })
          }
          <button className="alarm_add_btn" onClick={this.clickBtnHandler.bind(this)}>+</button>
          <div className={isAdd ? "modal" : "none"}>
            <div className="content">
              <button onClick={this.clickBtnHandler.bind(this)} value="확인">확인</button>
              <button onClick={this.clickBtnHandler.bind(this)} value="취소">취소</button>
              <h3>알람설정</h3>
              <input type="time" onChange={this.setAlarmTime.bind(this)} name="time" />
              <form>
                <label for="qestion">미션선택</label>
                <select name="qestion" id="qestions" onChange={this.onChangeHandler.bind(this)} name="question">
                  <option value="따라쓰기">따라쓰기</option>
                  <option value="수학문제풀기">수학문제풀기</option>
                </select>
              </form>
              <div> 소리 / 진동
                </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default withRouter(Alarm);