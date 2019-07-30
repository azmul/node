import React from 'react';
import { Socket } from '../utils/connection';
import ChatBox from './ChatBox';

class CurrentUsers extends React.Component {
    constructor(props) {
       super(props);
       this.state = {currentUsers : [], chatWindow: false, chatUser: null} 
    }
    
    componentDidMount() {
        Socket.on('currentUserSentToClient', data => {
            this.setState({ currentUsers: data })
        })

        Socket.on('currentUserChatOn', data => {
            this.setState({ chatWindow: data })
        })
    }
    startChat(user){
        const info = {
            userOne: this.props.himself,
            userTwo: user,
        }
        this.setState({chatWindow: true, chatUser: user})
        Socket.emit('chatWithParticularUser', info);
    }
    removeChatBox() {
        this.setState({chatWindow: false})
    }
  render() {
      
      return (
        <div>
            <ul>
            {this.state.currentUsers.map(user => {
                return(
                    <li key={user.socketId} onClick={() => this.startChat(user)}>{ user.name }</li> 
                )
            })
            }
            </ul>
            {this.state.chatWindow ?
                <div className="chatBox">
                    <button onClick={() => this.removeChatBox()}>Remove</button>
                    <ChatBox /> 
                </div> : null
            }
       </div>
      )
  }
}

export default CurrentUsers;