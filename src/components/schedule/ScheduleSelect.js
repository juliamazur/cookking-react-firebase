import React from 'react';
import styled from "styled-components";

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import ScheduleMenu from './ScheduleMenu';

const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
`;

class ScheduleSelect extends React.Component {

  render() {
    return (
      <Container>
        <Grid container>
          <Grid item xs={10} md={2} style={{padding: 10}}>
            <FormControl fullWidth={true} variant="outlined">
              <Select
                value={this.props.schedule ? this.props.schedule.id : ''}
                onChange={this.props.handleScheduleChange}
              >
                {this.props.allSchedules.map(item => {
                  return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <ScheduleMenu
              addSchedule={this.props.handleAddSchedule}
              deleteSchedule={this.props.handleDeleteSchedule}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default ScheduleSelect;
