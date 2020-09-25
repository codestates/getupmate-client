import React from 'react';
import './MyPage.css'
import profile_pic from '../profile_pic.png';

export default class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: null,
      changeClick: false,
    }
  }

  onChangeHandler(e) {
    this.setState({
      nickname: e.target.value
    })
  }

  changeNickname() {
    const { setNicknameHandler } = this.props;
    console.log(this.state.changeClick)
    if (!this.state.changeClick) {
      fetch('http://54.180.92.83:3000/user/changenickname', {
        method: 'POST',
        body: JSON.stringify({
          nickname: this.state.nickname
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log(json)
          setNicknameHandler(json.nickname)
        })
    }
    this.setState({ changeClick: !this.state.changeClick })
  }

  render() {
    return (
      <div className="MyPage">
        <h2>My Page</h2>
        <div className="MyPage_profile">
          <img src={profile_pic} />
          <div className="MyPage_nickname">
            {this.state.changeClick
              ? <input type="text" onChange={this.onChangeHandler.bind(this)} />
              : <span>{this.props.nickname}</span>}
            <button
              onClick={this.changeNickname.bind(this)}>✏️
            </button>

            <button>Sign out</button>
          </div>
        </div>
      </div>
    )
  }
}