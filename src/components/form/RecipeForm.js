import React from 'react';

import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import withWidth from '@material-ui/core/withWidth';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

class RecipeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {

    const { handleChange, addIngredient, deleteIngredient } = this.props;

    return (
      <div className="recipe-form-placeholder">
        <Grid container>
          <Grid item xs={12}>
            <FormControl fullWidth={true} style={{margin: '5px'}}>
              <TextField
                data-test='nameInput'
                name='name'
                value={this.props.name}
                label='Nazwa'
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <IngredientForm
          addIngredient={addIngredient}
        />
        {this.props.ingredients ? <IngredientList ingredients={this.props.ingredients} deleteIngredient={deleteIngredient} /> : ''}
        <Grid container>
        <Grid item xs={12}>
            <FormControl fullWidth={true} style={{margin: '5px'}}>
              <TextField
                data-test='descriptionInput'
                name='description'
                value={this.props.description}
                label='Opis'
                multiline
                rows="4"
                margin="normal"
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          </Grid>
      </div>
    );

  }

}

// export default RecipeForm;
export default withWidth()(RecipeForm);
