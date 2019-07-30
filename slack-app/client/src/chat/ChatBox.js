import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Socket } from '../utils/connection';

class CurrentUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            msg: null,
            mySelf: null,
            otherUser: null
        }
    }
    componentDidMount() {
        const socketId = Socket.id;
        Socket.on('twoUsersInfo', data => {
            if(socketId === data.userOne.socketId) {
                this.setState({mySelf: data.userOne, otherUser: data.userTwo})
            } else if(socketId === data.userTwo.socketId){
                this.setState({mySelf: data.userTwo, otherUser: data.userOne})
            } else {
                console.log('No');
            }
        })
        Socket.on('chatMessagesToClient', data => {
            let joinedChats = this.state.chats.concat(data);
            this.setState({chats: joinedChats})
        })
    }
    sendMsg = () => {
        Socket.emit('chatMessagesToServer', {userOne: this.state.mySelf, userTwo:this.state.otherUser, message: this.state.msg})
    };
    
    chatLists() {
        return this.state.chats.map(chat => {
            return(
                <div>
                    <h4>{chat.name}</h4>
                    <p>{chat.message}</p>
                </div>
            )
        })
    }

  render() {
      return (
        <div>
        <h3>Particular Message</h3>
          <form noValidate autoComplete="off">
                <TextField
                    id="outlined-multiline-flexible"
                    label="Message"
                    multiline
                    rowsMax="4"
                    margin="normal"
                    value={this.msg}
                    onChange={(e) => this.setState({msg: e.target.value})}
                    variant="outlined"
                />
                <div>
                    <Button variant="contained" color="primary" onClick={this.sendMsg}>
                        Send
                    </Button>
                </div> 
            </form>
            <div>
                {this.chatLists()}
            </div>
       </div>
      )
  }
}

export default CurrentUsers;