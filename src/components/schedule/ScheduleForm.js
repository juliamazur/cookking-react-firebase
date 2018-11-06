import React from 'react';
import styled from "styled-components";

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  background-color: #bbb;
  padding-top: 10px;
`;

class ScheduleForm extends React.Component {

    render() {
        return (
              <Container>
                <Grid container>
                  <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={2}>
                    <FormControl fullWidth={true}>
                        <InputLabel shrink htmlFor="age-label-placeholder">
                            wybierz grafik
                        </InputLabel>
                        <Select
                            value={this.props.id}
                            onChange={this.props.handleScheduleChange}
                            input={<Input id="schedule" />}
                        >
                            {this.props.allSchedules.map(item => {
                                return(<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                            })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth={true}>
                    <TextField
                        id="schedule-name"
                        value={this.props.name}
                        placeholder="Wpisz nazwę grafiku"
                        margin="normal"
                        onChange={this.props.handleNameChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.props.handleFormSubmit}
                >
                    Zapisz
                </Button>
                </Grid>
                </Grid>
              </Container>
        );
    }
}

export default ScheduleForm;
