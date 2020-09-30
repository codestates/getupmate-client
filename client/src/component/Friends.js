import React from "react"
import "./Friends.css"
import { withRouter } from "react-router-dom"

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      userList: null,
      myFriendList: null
    }
  }

  componentDidMount() {
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

  searchUser(e) {
    e.preventDefault();
    fetch(`http://www.gijigae.com:3000/user/searchUser`, {
      method: 'POST',
      body: JSON.stringify({
        data: this.state.searchWord
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          userList: json
        })
      })
  }

  render() {
    const { userList, myFriendList } = this.state
    return (
      <div className="friends">
        <h2>Friends</h2>
        <form className="search">
          <input
            type="text"
            placeholder="이메일 혹은 닉네임을 검색해주세요"
            onChange={this.onChangeHandler.bind(this)}
          />
          <button onClick={this.searchUser.bind(this)}>검색</button>
        </form>

        {
          myFriendList && myFriendList.map((friend) => {
            const { id, nickname, photo } = friend;
            return (
              <li id={id}>
                <span>{photo}</span>
                <span>{nickname}</span>
              </li>
            )
          })
        }
        <ul>
          {userList && userList.map((data) => {
            const { id, nickname } = data;
            return (
              <li key={id}>
                <div>
                  <span>
                    {nickname}
                  </span>
                  <button>follow</button>
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