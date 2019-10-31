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

    const { editable, pickedScheduleId, scheduleList, handleScheduleChange, handleAddSchedule, handleDeleteSchedule } = this.props;
    const picked = pickedScheduleId ? pickedScheduleId : null;

    return (
      <Container>
        <Grid container>
          <Grid item xs={10} md={2} style={{padding: 10}}>
            <FormControl fullWidth={true} variant="outlined">
              <Select
                value={picked}
                onChange={handleScheduleChange}
              >
                {scheduleList.map(item => {
                  return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                })
                }
              </Select>
            </FormControl>
          </Grid>
            {editable ? (
              <Grid item xs={1}>
              <ScheduleMenu
              addSchedule={handleAddSchedule}
              deleteSchedule={handleDeleteSchedule}
            /></Grid>) : ''}
        </Grid>
      </Container>
    );
  }
}

export default ScheduleSelect;
