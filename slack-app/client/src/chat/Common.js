import React from 'react';
import { Socket } from '../utils/connection';
import TextField from '@material-ui/core/TextField';

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
            {this.state.recentMsg.map(post => {
                return(
                    <div key={post.id}>
                        <h3 key={post.id}>{ post.message }</h3> 
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Comment"
                            margin="normal"
                            value={this.msg}
                            onChange={(e) => this.setState({msg: e.target.value})}
                            variant="outlined"
                        />
                    </div>
                )
            })
            }
       </div>
      )
  }
}

export default Common;