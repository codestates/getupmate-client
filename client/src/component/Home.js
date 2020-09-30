import React from "react"
import "./Home.css"
import profile_pic from '../profile_pic.png';
import { withRouter } from "react-router-dom"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null
    }
    window.sessionStorage.setItem('pathname', this.props.location.pathname);
  }

  componentDidMount() {
    fetch(`http://www.gijigae.com:3000/feed/homefeed/${this.props.id}`)
      .then(res => res.json())
      .then(json => {
        console.log("home feed:", json)
        this.setState({
          feed: json
        })
      })
  }

  render() {
    const { feed } = this.state
    return (
      <div>
        <h2>Home</h2>
        <div className="home">
          <ul>
            {
              feed && feed.map((data) => {
                const { id, text, photo } = data;
                return (
                  <li key={id}>
                    <img src={photo || profile_pic}></img>
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