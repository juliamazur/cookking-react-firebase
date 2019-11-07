import React from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class RecipeFormModal extends React.Component {

  render() {

    const { open, title, fullScreen, width, content, onClose, handleSubmit } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          fullScreen={fullScreen || !isWidthUp('sm', width)}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">
            {title}
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

export default withWidth()(RecipeFormModal);
