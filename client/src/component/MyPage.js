import React from 'react';
import './MyPage.css'
import profile_pic from '../profile_pic.png';

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      changeClick: false,
      photo: null,
      setImage: null,
      openModal: false
    }
  }

  onChangeHandler(e) {
    this.setState({
      nickname: e.target.value
    })
  }

  openModalHandler() {
    this.setState({
      openModal: !this.state.openModal
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
    const { setNicknameHandler, id } = this.props;
    if (this.state.changeClick && this.state.nickname) {
      fetch(`http://54.180.92.83:3000/user/changenickname/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          nickname: this.state.nickname
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => setNicknameHandler(json.nickname))
    }
    this.setState({
      changeClick: !this.state.changeClick
    })
  }

  signoutHandler() {
    fetch('http://54.180.92.83:3000/user/signout', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.messsage)
        this.props.isLoginHandler()
      })
  }

  render() {
    return (
      <div className="MyPage">
        <h2>My Page</h2>
        <div className="MyPage_profile">
          <img
            // signin에서 받은 photo 값이 null일 경우 기본사진 띄우기
            src={this.props.photo || profile_pic}
            // 사진 클릭시 모달창으로 사진편집창이 떠야할듯..
            onClick={this.openModalHandler.bind(this)}
          />
          <div className={this.state.openModal ? "photoModal" : "none"}>
            <div className="content">
              <div>modal open</div>
              <button>저장</button>
              <button onClick={this.openModalHandler.bind(this)}>취소</button>
            </div>
          </div>
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

export default MyPage;