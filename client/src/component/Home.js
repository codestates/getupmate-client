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

  async componentDidMount() {
    let getHomeFeed = await fetch(`http://www.gijigae.com:3000/feed/homefeed/${this.props.id}`)
    let homefeed = await getHomeFeed.json();
    Promise.all(homefeed.map(async (feed) => {
      let imgfetch = await fetch(feed.photo)
      if (imgfetch.status === 404) {
        feed.photo = profile_pic
      }
      return feed;
    })).then(feed => {
      this.setState({
        feed: feed
      })
    })
  }

  async refresh() {
    let getHomeFeed = await fetch(`http://www.gijigae.com:3000/feed/homefeed/${this.props.id}`)
    let homefeed = await getHomeFeed.json();
    Promise.all(homefeed.map(async (feed) => {
      let imgfetch = await fetch(feed.photo)
      if (imgfetch.status === 404) {
        feed.photo = profile_pic
      }
      return feed;
    })).then(feed => {
      this.setState({
        feed: feed
      })
    })
  }

  render() {
    const { feed } = this.state
    return (
      <div>
        <h2>Home</h2>
        <div className="home">
          <button className="refresh_btn" onClick={this.refresh.bind(this)}>⟳</button>

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