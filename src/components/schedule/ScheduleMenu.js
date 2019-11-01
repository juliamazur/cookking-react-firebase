import React from 'react';
import styled from "styled-components";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const Container = styled.div`
  background-color: #ddd;
  padding-top: 40px;
  padding-bottom: 40px;
`;

class ScheduleSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleClose() {
    this.setState({
      open: false,
      anchorEl: null
    });
  };

  addSchedule() {
    this.props.addSchedule();
    this.handleClose();
  }

  deleteSchedule() {
    this.props.deleteSchedule();
    this.handleClose();
  }

  render() {
    return (
      <div style={{margin: '15px 5px'}}>
      <Fab
        color="secondary"
        size="small"
        aria-label="Zarządzaj grafikami"
        onClick={this.handleClick.bind(this)}>
        <MoreVertIcon/>
      </Fab>
      <Menu
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        onClose={this.handleClose.bind(this)}
      >
        <MenuItem key='add' onClick={this.addSchedule.bind(this)}>Dodaj grafik</MenuItem>
        <MenuItem key='delete' onClick={this.deleteSchedule.bind(this)} style={{color: 'red'}}>Skasuj ten grafik</MenuItem>
      </Menu>
      </div>
    );
  }
}

export default ScheduleSelect;
