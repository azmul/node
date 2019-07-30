import React from 'react';
import { Socket } from '../utils/connection';

class Common extends React.Component {
    state = {recentMsg : []}
    componentDidMount() {
        Socket.on('messageSentToAll', data => {
            let joined = this.state.recentMsg.concat(data);
            this.setState({ recentMsg: joined })
            console.log(this.state.recentMsg);
        })
    }
  render() {
      return (
        <div>
            <ul>
            {this.state.recentMsg.map(message => {
                return(
                    <li key={message.id}>{ message.message }</li> 
                )
            })
            }
            </ul>
       </div>
      )
  }
}

export default Common;