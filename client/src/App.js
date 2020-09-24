import React from 'react';
import Signin from './component/Signin';
import Signup from './component/Signup';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <Signin />
        <Signup />
      </div>
    );
  }
}

export default App;
