import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

class NameInput extends React.Component {

  render() {
    return (
        <FormControl fullWidth={true}>
            <h3>Edytuj przepis</h3>
            <TextField
                id="recipe-name"
                value={this.props.name}
                label="Nazwa przepisu"
                placeholder="Wpisz nazwę przepisu"
                margin="normal"
                onChange={this.props.handleNameChange}
            />
        </FormControl>
    );
  }
}

export default NameInput;
