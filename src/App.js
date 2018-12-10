import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'

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
  constructor(props) {
    super(props);

    this.state = {
      activeRoomId: [],
      isClicked: false,

    }

  };

  handleClick(key) {
    const newRoom = key;
    this.setState({
      activeRoom: newRoom,
      isClicked: true
    });
    console.log("room clicked");
    console.log(this.state.activeRoom);
    console.log(this.state.messages);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <RoomList
            firebase={firebase}
            handleClick={(room, roomId) => {this.handleClick(room, roomId)}}
            displayMessage={this.displayMessage}
            />
          <MessageList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              handleClick={this.handleClick}
            />
        </main>
      </div>
    );
  }
}

export default App;
