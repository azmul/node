import React from 'react'
import Socket from '../utils/connection';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Common from './Common';

class Dashboard extends React.Component {
    state = {msg: null}
    componentDidMount() {
        Socket.on('connect', () => {
            Socket.on('messageFromServer', (data) => {
                console.log(data);
            })
            Socket.emit('messageToServer', {name: 'Client'})
        })
    }
    handleChange = name => event => {
        this.setValues({ ...this.state, [name]: event.target.value });
    };
    sendMsg = () => {
        Socket.emit('messageToAll', {id: Math.random(), message: this.state.msg})
    }
  render() {
      return(
          <div>
            <h1>Dashboard</h1> 
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