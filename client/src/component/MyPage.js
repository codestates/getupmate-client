import React from 'react';
import './MyPage.css'
import profile_pic from '../profile_pic.png';
import Tab from "./Tab"

export default class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: null,
      changeClick: false,
      photo: null,
      setImage: null
    }
  }

  onChangeHandler(e) {
    this.setState({
      nickname: e.target.value
    })
  }

  onChangePhoto(e) {
    // setImage(e.target.files[0]);
  }

  uploadPhoto() {
    console.log("want to change photo...")
    // const formData = new FormData();
    // formData.append("img", photo);
    // fetch('http://54.180.92.83:3000/user/changephoto', {
    //   method: 'POST',
    //   body: photo,
    //   headers: {
    //     "Content-type": "application/json"
    //   }
    // })
  }

  changeNickname() {
    const { setNicknameHandler } = this.props;
    if (this.state.changeClick && this.state.nickname) {
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

  signoutHandler() {
    fetch('http://54.180.92.83:3000/user/signout', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => console.log(json.message))
  }

  render() {
    return (
      <div className="MyPage">
        <h2>My Page</h2>
        <div className="MyPage_profile">
          <img
            src={profile_pic}
            onChange={this.onChangePhoto.bind(this)}
            onClick={this.uploadPhoto.bind(this)}
          />
          <div className="MyPage_nickname">
            {this.state.changeClick
              ? <input type="text" onChange={this.onChangeHandler.bind(this)} />
              : <span>{this.props.nickname}</span>}
            <button
              onClick={this.changeNickname.bind(this)}
            >✏️</button>
            <button
              onClick={this.signoutHandler.bind(this)}
            >Sign out</button>
          </div>
        </div>
      </div>
    )
  }
}