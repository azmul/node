import React from 'react'
import { adminSocket } from '../utils/connection';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Common from './Common';

class Dashboard extends React.Component {
    state = {msg: null}
    componentDidMount() {
        adminSocket.on('connect', () => {
            adminSocket.on('messageFromServer', (data) => {
                console.log('Admin',data);
            })
            adminSocket.emit('messageToServer', {name: 'Client'})
        })
    }
    handleChange = name => event => {
        this.setValues({ ...this.state, [name]: event.target.value });
    };
    sendMsg = () => {
        adminSocket.emit('messageToAll', {id: Math.random(), message: this.state.msg})
    }
  render() {
      return(
          <div>
            <h1>Admin</h1> 
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
            <Common />
          </div>
      )
  }
}

export default Dashboard;