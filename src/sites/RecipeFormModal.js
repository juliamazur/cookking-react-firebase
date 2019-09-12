import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';


import RecipeForm from './RecipeForm';

class RecipeFormModal extends React.Component {

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth='lg'
        >
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
            <Button onClick={this.props.handleClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={this.props.handleSubmit} color="primary" autoFocus>
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RecipeFormModal;