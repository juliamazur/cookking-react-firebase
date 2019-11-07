import React from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import md5 from "md5";

import RecipeForm from '../form/RecipeForm';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class RecipeFormModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {...this.props.recipe};
    this.handleChange = this.handleChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addIngredient(newIngredient) {
    //@TODO validation

    if(!newIngredient.name) {
      return;
    }

    const d = new Date();
    const id = md5(d.getTime());
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

    const { open, fullScreen, width, onClose, handleSubmit } = this.props;

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
            Dodaj przepis
          </DialogTitle>
          <DialogContent>
            {/*@TODO refactor*/}
            <RecipeForm
              key={this.key}
              handleChange={this.handleChange}
              name={this.state.name}
              description={this.state.description}
              ingredients={this.state.ingredients}
              ingredient={this.state.ingredient}
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
