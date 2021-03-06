import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {withStyles} from "@material-ui/core/styles/index";


const styles = theme => ({
    button: {
      position: 'fixed',
      right: '40px',
      bottom: '30px',
    }
});

class RecipeListFab extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.button}
        onClick={this.props.onClick}
      >
        <AddIcon />
      </Fab>
    );
  }
}

export default withStyles(styles)(RecipeListFab);
