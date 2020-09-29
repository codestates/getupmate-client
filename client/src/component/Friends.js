import React from "react"
import "./Friends.css"
import { withRouter } from "react-router-dom"

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      userList: null
    }
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
    const { userList } = this.state
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