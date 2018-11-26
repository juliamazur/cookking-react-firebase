import React from 'react';

import FormControl from '@material-ui/core/FormControl';

class FileInput extends React.Component {

  render() {
    return (
      <FormControl fullWidth={true}>
        <input
          data-test="fileInput"
          ref={this.props.reference}
          accept="image/*"
          id="button-file"
          type="file"
          style={{ display: 'none' }}
          onChange={this.props.handleChange}
        />
      </FormControl>
    );
  }
}

export default FileInput;
