import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      activeRoom: [],

      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

    };

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  };

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  };

  createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) {return}
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({newRoomName: ''});
  };


render() {
  return (
    <div className="RoomList">
      <table>
        <tbody>
          { this.state.rooms.map ( (room, index) =>
            <tr>
              <td
              onClick={() => this.props.handleClick(room.name, room.key)}
              onClick={() => this.props.displayMessage(message)}
              >{room.name}</td>
            </tr>
           )
          }
          <tr>
            <td>
              <form onSubmit={ (e) => this.createRoom(e) }>
                <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
                <input type="submit" />
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
 }
};

export default RoomList;
