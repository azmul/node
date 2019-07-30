import React from 'react'
import { Socket } from '../utils/connection';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Common from './Common';
const faker = require('faker');

class Dashboard extends React.Component {
    state = {msg: null}
    componentDidMount() {
        Socket.on('connect', () => {
            Socket.emit('sentSocketId', {socketId: Socket.id, name: faker.name.findName()})
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
    };
    shareLocation = () => {
        if(!navigator.geolocation) {
           return alert('Your browser not supported this location api')
        }
        navigator.geolocation.getCurrentPosition(position => {
            Socket.emit('sendLocation', {lat: position.coords.latitude, lng: position.coords.longitude}, (message) => {
                console.log(message);
            })
        })
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
            <div>
                <Button variant="contained" color="primary" onClick={this.shareLocation}>
                    Share Location
                </Button>
            </div> 
            <Common />
          </div>
      )
  }
}

export default Dashboard;