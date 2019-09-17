import React from 'react';
import styled from "styled-components";

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const Container = styled.div`
  background-color: #eee;
  padding-top: 40px;
  padding-bottom: 40px;
`;

class ScheduleForm extends React.Component {

  render() {
    return (
      <Container>
        <Grid container>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={2}>
            <FormControl variant="outlined" fullWidth={true}>
              <Select
                value={this.props.schedule ? this.props.schedule.id : ''}
                onChange={this.props.handleScheduleChange}
                input={<Input id="schedule" />}
              >
                {this.props.allSchedules.map(item => {
                  return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} lg={2}>
            <Fab
              // variant="extended"
              size="small"
              color="secondary"
              aria-label="delete"
              // className={classes.margin}
            ><DeleteIcon/></Fab>
            {/*<IconButton aria-label="Delete" variant="outlined" color="secondary" onClick={() => this.props.deleteSchedule(this.props.id)}>*/}
            {/*<DeleteIcon/>*/}
            {/*</IconButton>*/}
            <IconButton aria-label="Copy" onClick={() => this.props.copySchedule(this.props.id)}>
              <FileCopyIcon/>
            </IconButton>
            <IconButton aria-label="New" onClick={() => this.props.newSchedule(this.props.id)}>
              <AddIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default ScheduleForm;
