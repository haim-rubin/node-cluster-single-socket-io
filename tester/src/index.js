import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';
var socket = io(window.location.origin);
socket.on('connect', function(){});
socket.on('event', function(data){
    console.log(data)
});
socket.on('disconnect', function(){});

ReactDOM.render(<App socket={socket}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
