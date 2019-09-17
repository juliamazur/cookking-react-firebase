import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';


import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import RecipeForm from './RecipeForm';
//
const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10
    // right: theme.spacing(1),
    // top: theme.spacing(1),
    // color: theme.palette.grey[500],
  },
  headerTitle: {
    //@TODO why App.css doesnt set this?
    fontFamily: 'Great Vibes'
  }
});

class RecipeFormModal extends React.Component {

  render() {

    const { classes, onClose, handleSubmit } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          fullScreen={!isWidthUp('sm', this.props.width)}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">
            {/*<Typography variant="h4" className={classes.headerTitle}>Edytuj przepis</Typography>*/}
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <RecipeForm
              recipe={this.props.recipe}
              ingredient={this.props.ingredient}
              handleNameInputChange={this.props.handleNameInputChange}
              handleDescriptionInputChange={this.props.handleDescriptionInputChange}
              handleIngredientNameInputChange={this.props.handleIngredientNameInputChange}
              handleIngredientAmountInputChange={this.props.handleIngredientAmountInputChange}
              handleIngredientUnitInputChange={this.props.handleIngredientUnitInputChange}
              handleAddIngredient={this.props.handleAddIngredient}
              handleRemoveIngredient={this.props.handleRemoveIngredient}
              setType={this.props.setType}
            />
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