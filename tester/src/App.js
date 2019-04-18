import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    count: 0
  }
  render() {
    const { socket } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

            <div>
              <button onClick={
                (event) =>{
                  event.stopPropagation()

                  socket.emit('data', {Data: `Any ${this.state.count}....`})
                  this.setState({ count: this.state.count + 1 })

                }
              }>
Send data
              </button>
            </div>

        </header>
      </div>
    );
  }
}

export default App;
