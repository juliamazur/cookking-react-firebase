import React from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import md5 from "md5";

import RecipeForm from '../form/RecipeForm';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class RecipeFormModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    //@TODO refactor
    if(name === 'ingredientName') {
      const newIngredient = {...this.state.ingredient};
      newIngredient.name = value;
      this.setState({ingredient: newIngredient});
    }

    if(name === 'ingredientAmount') {
      const newIngredient = {...this.state.ingredient};
      newIngredient.amount = value;
      this.setState({ingredient: newIngredient});
    }

    if(name === 'ingredientUnit') {
      const newIngredient = {...this.state.ingredient};
      newIngredient.unit = value;
      this.setState({ingredient: newIngredient});
    }

    this.setState({
      [name]: value
    });
  }

  addIngredient() {
    //@TODO validation

    if(!this.state.ingredientName) {
      return;
    }

    const d = new Date();
    const id = md5(d.getTime());

    const newIngredient = {...this.state.ingredient};
    newIngredient.id = id;

    const newIngredients = this.state.ingredients ? this.state.ingredients.slice() : [];
    newIngredients.push(newIngredient);

    this.setState({
      ingredients: newIngredients,
      ingredient: {}
    });
  }

  deleteIngredient(id) {

    const newIngredients = this.state.ingredients.filter((i) => {
      return i.id !== id;
    });

    this.setState({ingredients: newIngredients});
  }

  render() {

    const { open, fullScreen, width, recipe, onClose, handleSubmit } = this.props;

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
            {/*@TODO move to the right place*/}
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {/*@TODO refactor*/}
            <RecipeForm
              recipe={recipe}
              handleChange={this.handleChange}
              ingredients={this.state.ingredients}
              ingredient={this.state.ingredient ? this.state.ingredient : []}
              addIngredient={this.addIngredient}
              deleteIngredient={this.deleteIngredient}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={() => handleSubmit(this.state)} color="primary" autoFocus>
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withWidth()(RecipeFormModal);