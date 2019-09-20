import React from 'react';
import styled from "styled-components";

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  background-color: #eee;
  padding-top: 40px;
  padding-bottom: 40px;
`;

class ScheduleSelect extends React.Component {

  render() {
    return (
      <Container>
        <Grid container>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth={true}>
              <Select
                value={this.props.schedule ? this.props.schedule.id : ''}
                onChange={this.props.handleScheduleChange}
                input={<Input id="schedule"/>}
              >
                {this.props.allSchedules.map(item => {
                  return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                })
                }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default ScheduleSelect;
