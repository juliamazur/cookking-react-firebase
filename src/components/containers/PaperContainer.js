import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  paper: {
    [theme.breakpoints.up('md')]: {
      margin: 30
    }
  }
});

class PaperContainer extends Component {


  render() {
    const {classes, content} = this.props;

    return (
      <Paper className={classes.paper}>
        {content}
      </Paper>
    );
  }
}

export default withStyles(styles)(PaperContainer);
