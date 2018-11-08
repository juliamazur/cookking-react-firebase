import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import mealsFixture from '../../fixtures/meals.json';


class IngredientSelect extends React.Component {

  render() {
    return (
        <FormControl fullWidth={true}>
            <InputLabel shrink htmlFor="age-label-placeholder">
                Posiłki
            </InputLabel>
            <Select
                value={this.props.meal}
                onChange={this.props.handleMealChange()}
                input={<Input id="meal" />}
            >
                {mealsFixture.map(meal => {
                    return(<MenuItem key={meal.id} value={meal.id}>{meal.name}</MenuItem>)
                })
                }
            </Select>
        </FormControl>
    );
  }
}

export default IngredientSelect;
