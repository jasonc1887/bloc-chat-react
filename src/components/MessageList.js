
import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: '',
      activeRoom: '',
      username: '',
      content: '',
      sentAt: '',
      roomId: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
    }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  createMessage(e) {
    e.preventDefault();
    if (!this.state.newMessage) {return}
    this.messagesRef.push({
      content: this.newMessage,
      roomId: this.activeRoom,
      sentAt: Date().toLocaleString(),
      username: this.user
    });
    this.setState({newMessage: ''});
  };

  handleMessage(e) {
    this.setState({ newMessage: e.target.value });
  }

  render(){
    return(
      <section className="message-list">
        <div className="messages-per-room">
          {
            this.state.messages.filter((message) => this.props.activeRoom === message.roomId)
              .map((message) =>
                <div>
                  <p id="username">{message.username}</p>
                  <p id="time">{message.sentAt}</p>
                  <p id="content">{message.content}</p>
                </div>
              )
          }
        </div>
        <div>
          <form onSubmit={ (e) => this.createMessage(e) }>
            <input type="text" value={ this.state.newMessage } onChange={ (e) => this.handleMessage(e) }/>
            <input type="submit"/>
          </form>
        </div>
      </section>
    );
  }
}

export default MessageList;
