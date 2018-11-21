import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

class TextInput extends React.Component {

  render() {
    return (
        <FormControl fullWidth={true}>
            <TextField
              id={this.props.id}
              name={this.props.name}
              data-test="input"
              value={this.props.value}
              label={this.props.label}
              placeholder={this.props.placeholder}
              margin="normal"
              onChange={this.props.handleChange}
            />
        </FormControl>
    );
  }
}

export default TextInput;
