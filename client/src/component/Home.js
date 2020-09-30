import React from "react"
import "./Home.css"
import { withRouter } from "react-router-dom"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null
    }
  }

  componentDidMount() {
    fetch(`http://www.gijigae.com:3000/feed/myfeed/${this.props.id}`)
      .then(res => res.json())
      .then(json => {
        console.log("get myfeed:", json)
        this.setState({
          feed: json
        })
      })
  }

  render() {
    console.log("feed:", this.state.feed)
    const { feed } = this.state
    return (
      <div>
        <h2>Home</h2>
        <div className="home">
          <ul>
            {
              feed && feed.map((data) => {
                {/* const { id, time, question } = data;
                return (
                  <li key={id}>
                    <div>
                      {`${this.props.nickname}님이
                        ${Number(time.slice(0, 2)) >= 12 ? `오후 ${Number(time.slice(0, 2)) === 12 ? time.slice(0, 5) : `0` + Number(time.slice(0, 2) - 12) + time.slice(2, 5)}` : `오전 ${time.slice(0, 5)}`}에
                        ${question}mission을 풀어 기상하셨습니다.`}
                    </div>
                  </li>
                ) */}
                const { id, text } = data;
                return (
                  <li key={id}>
                    <div>{text}</div>
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