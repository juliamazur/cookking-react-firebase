import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

class DescriptionInput extends React.Component {

  render() {
    return (
        <FormControl fullWidth={true}>
            <TextField
                id="recipe-description"
                value={this.props.description}
                label="Opis przepisu"
                multiline
                rows={3}
                onChange={this.props.handleDescriptionChange}
            />
        </FormControl>
    );
  }
}

export default DescriptionInput;
