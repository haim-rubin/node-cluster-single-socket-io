import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
                  fetch('/api/haim')
                  .then(res=>res.json())
                  .then(d =>{
                    console.log(d)
                  })
                  socket.emit('data', {Data: 'Any ....'})

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
