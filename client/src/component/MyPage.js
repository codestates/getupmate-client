import React from 'react';
import './MyPage.css'
import profile_pic from '../profile_pic.png';
import { withRouter } from "react-router-dom"

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      changeClick: false,
      photo: null,
      previewPhoto: null,
      openModal: false,
      feed: null,
    }
    window.sessionStorage.setItem('pathname', this.props.location.pathname);
    window.sessionStorage.setItem('photo', this.props.photo);
  }

  componentDidMount() {
    // 마이페이지 피드 불러오기
    fetch(`http://www.gijigae.com:3000/feed/myfeed/${this.props.id}`)
      .then(res => res.json())
      .then(json => {
        console.log("mypage feed:", json)
        this.setState({
          feed: json
        })
      })
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

  onChangePhoto(event) {
    // this.setState({ photo: e.target.files[0] });
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log("onChangePhoto:", file)
    reader.onloadend = () => {
      // 파일 읽기가 완료되면 state를 바꿈
      this.setState({
        photo: file,
        previewPhoto: reader.result
      })
    }
    // file(blob) 읽어오기
    reader.readAsDataURL(file);
  }

  uploadPhoto(e) {
    e.preventDefault();
    const { id } = this.props;
    const formData = new FormData();
    formData.append("photo", this.state.photo);
    // formData === {photo: this.state.photo} *일반콘솔로확인불가*
    // for (var pair of formData.entries()) {
    //   console.log("formData??", pair[0], ":", pair[1]);
    //   // pair[0] = key, pair[1] = value
    // }
    fetch(`http://www.gijigae.com:3000/user/changephoto/${id}`, {
      method: 'POST',
      body: formData,
      // multer사용할 경우 headers 없이 보내야함
    })
      .then((res) => {
        console.log("changephoto response:", res)

        this.props.setPhotoHandler(this.state.previewPhoto)
        // console.log(this.state.previewPhoto)

        // 모달 창 닫기
        this.openModalHandler();
      })
  }


  changeNickname() {
    const { setNicknameHandler, id } = this.props;
    if (this.state.changeClick && this.state.nickname) {
      fetch(`http://www.gijigae.com:3000/user/changenickname/${id}`, {
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
    fetch('http://www.gijigae.com:3000/user/signout', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.messsage)
        this.props.isLoginHandler()
        window.sessionStorage.clear();
      })
  }

  render() {
    const { feed } = this.state
    return (
      <div className="MyPage">
        <h2>My Page</h2>
        <div className="MyPage_profile">
          <img
            // signin에서 받은 photo 값이 null일 경우 기본사진 띄우기
            // 새로고침시 "null"이 되는 오류 수정
            src={this.props.photo && this.props.photo !== "null"
              ? this.props.photo : profile_pic}
            // 사진 클릭시 모달창으로 사진편집창 띄우기
            onClick={this.openModalHandler.bind(this)}
          />
          <div className={this.state.openModal ? "photoModal" : "none"}>
            <div className="content">
              <form className="form" encType="multipart/form-data">
                <button onClick={this.uploadPhoto.bind(this)}>저장</button>
                <button onClick={this.openModalHandler.bind(this)}>취소</button>
                <h3>프로필 사진 설정</h3>
                <p>
                  <input
                    type='file'
                    accept='image/jpg,image/png,image/jpeg,image/gif'
                    // name 서버와 맞추기!
                    name='file'
                    onChange={this.onChangePhoto.bind(this)}
                  />
                  {/* 사진업로드 시 미리보기 */}
                  {this.state.photo ? <img className='previewPhoto' src={this.state.previewPhoto} /> : null}
                </p>
              </form>
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
              onClick={this.signoutHandler.bind(this)
              } className="signout"
            >Sign out</button>
          </div>
        </div>
        <div className="MyPage_feed">
          <ul>
            {
              feed && feed.map((data) => {
                const { id, text } = data;
                return (
                  <li key={id}>
                    <img
                      src={this.props.photo && this.props.photo !== "null"
                        ? this.props.photo : profile_pic}></img>
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

export default withRouter(MyPage);