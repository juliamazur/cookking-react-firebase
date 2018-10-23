import React from 'react';
import styled from "styled-components";

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
