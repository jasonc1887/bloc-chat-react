import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      user: null,
      username: null
    }

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);

  }

  handleSignIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.updateUser();
    this.props.firebase.auth().signInWithPopup( provider )
    .then((result) => {
      const user = result.user;
      const username = user.displayName;
      this.setState({user: user});
      this.setState({signedIn: true});
      this.setState({username: username})
      console.log(username);
      console.log(user);
    })
  }

  handleSignOut(){
    this.props.firebase.auth().signOut();
    this.setState({signedIn: false})
    this.setState({user: null});

  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
    });
  }


  render() {
    let button;
    if (this.state.signedIn) {
      button = <button onClick={this.handleSignOut}>Sign out</button>
    } else {
      button = <button onClick={this.handleSignIn}>Sign in</button>
    }
    return(
      <div className="authentication">
        <div>
          {button}
        </div>
        <p>
          {this.state.signedIn ? this.state.username : ''}
        </p>
      </div>
    )
  }
}

export default User;
