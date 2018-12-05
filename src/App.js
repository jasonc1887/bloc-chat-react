import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'

var config = {
  apiKey: "AIzaSyC3hdT7DZgj0H3jaQWgUTOKODgQcPfyHyc",
  authDomain: "bloc-chat-f308c.firebaseapp.com",
  databaseURL: "https://bloc-chat-f308c.firebaseio.com",
  projectId: "bloc-chat-f308c",
  storageBucket: "bloc-chat-f308c.appspot.com",
  messagingSenderId: "566375178162"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <RoomList />
        </main>
      </div>
    );
  }
}

export default App;
