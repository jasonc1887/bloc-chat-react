import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import User from './components/User'

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
      roomId: null,
      activeRoom: null,
      isClicked: false,
      key: null,

      currentItem: null,
      userName: null,
      items: [],
      user: null,
      username: null,
      content: null,
      sentAt: null
    }

    this.setActiveRoom = this.setActiveRoom.bind(this)
  };

  setActiveRoom (roomKey) {
    this.setState({
      activeRoom: roomKey,
      roomId: roomKey,
      isClicked: true
    });
    console.log("room clicked");
    console.log(this.state.activeRoom);
    console.log(this.state.roomId);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <RoomList
              firebase={firebase}
              setActiveRoom={this.setActiveRoom}
              activeRoom={this.state.activeRoom}
              roomId={this.state.roomId}
            />
          <MessageList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              roomId={this.state.roomId}
              setActiveRoom={this.setActiveRoom}
              user={this.state.user}
              username={this.state.username}
              content={this.state.content}
              sentAt={this.state.sentAt}

            />
          <User
              firebase={firebase}
              user={this.state.user}
              username={this.state.username}
            />
        </main>
      </div>
    );
  }
}

export default App;
