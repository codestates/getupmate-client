import React from "react"
import "./Friends.css"
import { withRouter } from "react-router-dom"
import profile_pic from '../profile_pic.png';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      userList: null,
      myFriendList: null
    }
    window.sessionStorage.setItem('pathname', this.props.location.pathname);
  }

  async componentDidMount() {
    let getFriends = await fetch(`http://www.gijigae.com:3000/follow/friends/${this.props.id}`)
    let friends = await getFriends.json();
    Promise.all(friends.map(async (friend) => {
      let imgfetch = await fetch(friend.photo)
      if (imgfetch.status === 404) {
        friend.photo = profile_pic
      }
      return friend;
    })).then((data) =>
      this.setState({
        ...this.state,
        myFriendList: data
      })
    )
  }

  getMyFriend() {
    fetch(`http://www.gijigae.com:3000/follow/friends/${this.props.id}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          ...this.state,
          myFriendList: data
        })
      )
  }

  onChangeHandler(e) {
    this.setState({
      searchWord: e.target.value
    })
  }

  async searchUser(e) {
    e.preventDefault();
    let searchpost = await fetch(`http://www.gijigae.com:3000/user/searchuser`, {
      method: 'POST',
      body: JSON.stringify({
        data: this.state.searchWord
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    let search = await searchpost.json();
    Promise.all(search.map(async (friend) => {
      let imgfetch = await fetch(friend.photo)
      if (imgfetch.status === 404) {
        friend.photo = profile_pic
      }
      return friend;
    })).then(json => {
      console.log(json)
      this.setState({
        userList: json
      })
    })
  }

  followBtnHandler(e) {
    /* 언팔로우 요청 */
    if (e.target.name === "unfollow") {
      const url = new URL(`http://www.gijigae.com:3000/follow/unfollow/${this.props.id}`);
      url.searchParams.append("id", e.target.value);
      fetch(url, {
        method: "DELETE"
      })
        .then(() => {
          this.getMyFriend();
        })
    }

    /* 팔로우 요청 */
    else if (e.target.name === "follow") {
      const url = new URL(`http://www.gijigae.com:3000/follow/follow/${this.props.id}`);
      url.searchParams.append("id", e.target.value);

      console.log(url);
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        }
      })
        .then(() => {
          this.getMyFriend();
        })
    }
  }

  checkFollow(id) {
    const { myFriendList } = this.state;
    if (!myFriendList) {
      return false;
    }
    for (let value of myFriendList) {
      for (let key in value) {
        if (value[key] === id) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    const { userList, myFriendList, searchWord } = this.state
    return (
      <div className="friends">
        <h2>Friends</h2>
        <form className="search">
          <input
            type="text"
            placeholder="이메일 혹은 닉네임을 검색해주세요"
            onChange={this.onChangeHandler.bind(this)}
          />
          <button onClick={this.searchUser.bind(this)} className="searchBtn">검색</button>
        </form>
        <ul className={searchWord.length ? "none" : "myFriend"}>
          {
            myFriendList && myFriendList.map((friend) => {
              const { id, nickname, photo } = friend;
              return (
                <li id={id}>
                  <label>
                    <input type="checkbox" value={id} name={this.checkFollow(id) ? "unfollow" : "follow"} onClick={this.followBtnHandler.bind(this)} />
                    <span className={this.checkFollow(id) ? "unfollow" : "follow"}>{
                      this.checkFollow(id) ? "unfollow" : "follow"
                    }</span>
                  </label>
                  <img src={photo} className="photo" />
                  <span className="nickname">{nickname}</span>
                </li>
              )
            })
          }
        </ul>
        <ul className={searchWord.length ? "searchList" : "none"}>
          {userList && userList.map((data) => {
            const { id, nickname, photo } = data;
            return (
              <li key={id}>
                <div>
                  <label>
                    <input type="checkbox" value={id} name={this.checkFollow(id) ? "unfollow" : "follow"} onClick={this.followBtnHandler.bind(this)} />
                    <span className={this.checkFollow(id) ? "unfollow" : "follow"}>{
                      this.checkFollow(id) ? "unfollow" : "follow"
                    }</span>
                  </label>
                  <img src={photo} className="photo" />
                  <span className="nickname">
                    {nickname}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default withRouter(Friends);
