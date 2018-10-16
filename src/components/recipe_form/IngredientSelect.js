import React from 'react';

import ingredientsFixture from '../../fixtures/ingredients.json';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class IngredientSelect extends React.Component {

  render() {
    return (
        <FormControl fullWidth={true}>
            <InputLabel shrink htmlFor="age-label-placeholder">
                Składniki
            </InputLabel>
            <Select
                value={this.props.ingredient}
                onChange={this.props.handleIngredientChange}
                input={<Input id="ingredient" />}
            >
                {ingredientsFixture.map(ingredient => {
                    return(<MenuItem key={ingredient.id} value={ingredient.id}>{ingredient.label}</MenuItem>)
                })
                }
            </Select>
        </FormControl>
    );
  }
}

export default IngredientSelect;
