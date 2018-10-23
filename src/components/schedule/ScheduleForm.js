import React from 'react';
import styled from "styled-components";

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const Container = styled.div`
  background-color: #fff;
  max-width: 400px;
  margin: 30px auto;
`;

class ScheduleForm extends React.Component {

    render() {
        return (
            <Container>
                <FormControl fullWidth={true}>
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
                    <h3>Zapisz grafik</h3>
                    {this.props.id}
                    <TextField
                        id="schedule-name"
                        value={this.props.name}
                        label="Nazwa grafiku"
                        placeholder="Wpisz nazwę grafiku"
                        margin="normal"
                        onChange={this.props.handleNameChange}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.props.handleFormSubmit}
                >
                    Zapisz
                </Button>
            </Container>
        );
    }
}

export default ScheduleForm;
