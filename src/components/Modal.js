import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';


import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10
    // right: theme.spacing(1),
    // top: theme.spacing(1),
    // color: theme.palette.grey[500],
  }
});

class RecipeFormModal extends React.Component {

  render() {

    const { classes, open, content, onClose, handleSubmit } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          fullScreen={!isWidthUp('sm', this.props.width)}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {content}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={handleSubmit} color="primary" autoFocus>
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(RecipeFormModal);