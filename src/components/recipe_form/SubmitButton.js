import React from 'react';

import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles/index";


const styles = theme => ({
    button: {}
});

class SubmitButton extends React.Component {

  render() {

    const { classes } = this.props;

    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={this.props.handleFormSubmit}
        >
            Zapisz
        </Button>
    );
  }
}

export default withStyles(styles)(SubmitButton);
