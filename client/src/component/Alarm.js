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
      type: "따라쓰기",
      curTime: null,
      difficulty: "상"
    }
    window.sessionStorage.setItem('pathname', this.props.location.pathname);
  }

  componentDidMount() {
    fetch(`http://www.gijigae.com:3000/alarm/${this.props.id}`)
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

  getData() {
    fetch(`http://www.gijigae.com:3000/alarm/${this.props.id}`)
      .then((res) => res.json())
      .then((data) => this.setState({
        ...this.state,
        data: data
      }))
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
      fetch(`http://www.gijigae.com:3000/alarm/${this.props.id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          type: this.state.type,
          difficulty: this.state.difficulty,
          time: this.state.time
        })
      }).then(() => {
        this.getData();
      })
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
      const { time, id } = cur;
      if (time === this.state.curTime && (window.localStorage.getItem(id) !== "true")) {
        this.props.curAlarm_numHandler(id);
        this.props.isAlarmHandler();
      }
    })
  }

  deleteHandler(e) {
    const url = new URL(`http://www.gijigae.com:3000/alarm/${this.props.id}`);
    url.searchParams.append("id", e.target.value);
    console.log(url);
    fetch(url, {
      method: 'DELETE',
    }).then(() => {
      this.getData();
    })

    window.localStorage.removeItem(e.target.value);
  }

  alarm_onHandler(id, checked) {
    window.localStorage.setItem(id, checked);
  }


  render() {
    const { data, isAdd } = this.state;
    return (
      <div className="alarm_css">
        <h2>Alarm</h2>
        <div className="alarm">
          <button className="alarm_add_btn" onClick={this.clickBtnHandler.bind(this)}>+</button>
          {
            data && data.map((data) => {
              const { id, time, question } = data;
              window.localStorage.getItem(id) === null ? window.localStorage.setItem(id, false) : window.localStorage.getItem(id);
              return (
                <li key={id} className={window.localStorage.getItem(id)}>
                  <div>
                    <label className={window.localStorage.getItem(id)}>
                      <input type="checkbox" onClick={(e) => {
                        this.alarm_onHandler(id, e.target.checked);
                      }
                      } />
                      <span className="slider"></span>
                    </label>
                    <button className="delete" onClick={this.deleteHandler.bind(this)} value={id}>&#10008;</button>
                    <span className="time">{
                      Number(time.slice(0, 2)) >= 12 ? `오후 ${Number(time.slice(0, 2)) === 12 ? time.slice(0, 5) : `0` + Number(time.slice(0, 2) - 12) + time.slice(2, 5)}` : `오전 ${time.slice(0, 5)}`
                    }</span>
                    <span className="question">{question}</span>
                  </div>
                </li>
              )
            })
          }

          <div className={isAdd ? "modal" : "none"}>
            <div className="content">
              <button onClick={this.clickBtnHandler.bind(this)} value="확인">확인</button>
              <button onClick={this.clickBtnHandler.bind(this)} value="취소">취소</button>
              <h3>알람설정</h3>
              <input type="time" onChange={this.setAlarmTime.bind(this)} name="time" />
              <form>
                <label for="qestion">type선택</label>
                <select name="type" id="type" onChange={this.onChangeHandler.bind(this)} name="type">
                  <option value="따라쓰기">따라쓰기</option>
                  <option value="수학문제풀기">수학문제풀기</option>
                </select>
                <label for="difficulty">난이도선택</label>
                <select name="difficulty" id="difficulty" onChange={this.onChangeHandler.bind(this)} name="difficulty">
                  <option>난이도선택</option>
                  <option value="상">상</option>
                  <option value="중">중</option>
                  <option value="하">하</option>
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default withRouter(Alarm);