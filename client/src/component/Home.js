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
                const { user_id, text } = data;
                return (
                  <li key={user_id}>
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