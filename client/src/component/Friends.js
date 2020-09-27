import React from "react"
import "./Friends.css"
import { withRouter } from "react-router-dom"

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="friends">
        <h3>Friends</h3>
      </div>
    )
  }
}


export default withRouter(Friends);