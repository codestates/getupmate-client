import React from "react"
import "./Home.css"
import { withRouter } from "react-router-dom"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="home">
        <h3>Home</h3>
      </div>
    )
  }
}


export default withRouter(Home);