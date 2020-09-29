import React from "react"
import "./Home.css"
import { withRouter } from "react-router-dom"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alarm: null
    }
  }

  componentDidMount() {
    fetch(`http://www.gijigae.com:3000/alarm/${this.props.id}`)
      .then(res => res.json())
      .then(json => this.setState({
        alarm: json
      }))
  }

  render() {
    console.log("alarm:", this.state.alarm)
    const { alarm } = this.state
    return (
      <div>
        <h2>Home</h2>
        <div className="home">
          <ul>
            {
              alarm && alarm.map((data) => {
                const { id, time, question } = data;
                return (
                  <li key={id}>
                    <div>
                      <span>
                        {this.props.nickname}님이
                      </span>
                      <span>
                        {Number(time.slice(0, 2)) >= 12 ? `오후 ${Number(time.slice(0, 2)) === 12 ? time.slice(0, 5) : `0` + Number(time.slice(0, 2) - 12) + time.slice(2, 5)}` : `오전 ${time.slice(0, 5)}`}에
                      </span>
                      <span>
                        {question}
                      `mission`을 풀어 기상하셨습니다.
                      </span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}


export default withRouter(Home);