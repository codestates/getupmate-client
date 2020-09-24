import React from 'react';
import Signin from './component/Signin';
import { fakeData } from './component/FakeData_Signin';
import './App.css'

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
      </div>
    );
  }
}

export default App;
