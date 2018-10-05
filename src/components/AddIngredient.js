import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import ingredientsJson from '../fixtures/ingredients.json';

class AddIngredient extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      ingredient: '',
      ingredients: [],
      allIngredients: ingredientsJson,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.ingredients !== prevProps.ingredients) {
      this.setState({
        ingredients: this.props.ingredients,
       });
    }
  }

  handleChange = name => event => {
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, event.target.value],
    }), () => {
      this.props.callbackFromParent(this.state.ingredients);
    });
  };

  render() {
    return (
      <div>
          {this.state.ingredients ? (
              <ul>
                  {this.state.ingredients.map(ingredient => {
                      return (<li key={ingredient}>{this.state.allIngredients.filter(v => v.id === ingredient)[0].name}</li>)
                  })
                  }
              </ul>
          ) : ('')}
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
