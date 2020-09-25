import React from 'react';
import './MyPage.css'
import profile_pic from '../profile_pic.png';
import Tab from "./Tab"

export default class MyPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="MyPage">
        <h2>My Page</h2>
        <div className="MyPage_profile">
          <img src={profile_pic} />
          <div className="MyPage_nickname">
            <span>nickname</span>
            <button>✏️</button>
            <button>Sign out</button>
          </div>
        </div>
        <Tab />
      </div>
    )
  }
}