import React from "react"
import "./Tab.css"
import {withRouter} from "react-router-dom"

class Tab extends React.Component {
    constructor(props) {
      super(props);
    }

    onClickHandler(e){
        this.props.history.push(`/${e.target.className}`)
    } 
    render(){
        return (
            <div className="tabs">
            <button className="home" onClick ={this.onClickHandler.bind(this)}>home</button>
            <button className="alarm" onClick ={this.onClickHandler.bind(this)}>Alarm</button>
            <button className="friends" onClick ={this.onClickHandler.bind(this)}>Friends</button>
            <button className="mypage" onClick ={this.onClickHandler.bind(this)}>myPage</button>
          </div>
        )
    }
}

export default withRouter(Tab);
