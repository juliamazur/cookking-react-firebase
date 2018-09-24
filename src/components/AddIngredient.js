import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import ingredientsJson from '../fixtures/ingredients.json';

class AddIngredient extends React.Component {

  constructor() {
    super();

    let ingredientsArray = [];
    for (let i in ingredientsJson) {
      ingredientsArray[ingredientsJson[i].id] = ingredientsJson[i].name;
    }

    this.state = {
      open: false,
      ingredient: '',
      ingredientsList: [],
      allIngredients: ingredientsJson,
      ingredientsArray: ingredientsArray,
    };
  }

  handleChange = name => event => {
    this.setState(prevState => ({
      ingredientsList: [...prevState.ingredientsList, event.target.value]
    }))
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
      <ul>
          {this.state.ingredientsList.map(ingredient => {
            return (<li key={ingredient}>{this.state.ingredientsArray[ingredient]}</li>)
          })
        }
      </ul>
      <FormControl fullWidth={true}>
        <InputLabel shrink htmlFor="age-label-placeholder">
          Składniki
        </InputLabel>
        <Select
              value={this.state.ingredient}
              onChange={this.handleChange('ingredient')}
              input={<Input id="ingredient" />}
            >
            <MenuItem value="">
                    <em>Wybierz</em>
                  </MenuItem>
                    {this.state.allIngredients.map(ingredient => {
                      return(<MenuItem key={ingredient.id} value={ingredient.id}>{ingredient.name}</MenuItem>)
                    })
                  }
                </Select>
        </FormControl>
      </div>
   );

}

}

export default AddIngredient;
