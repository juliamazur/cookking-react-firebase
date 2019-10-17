import React from 'react';

import TextInput from '../components/form/TextInput';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import IngredientTable from '../components/table/IngredientTable';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';


import withWidth, { isWidthUp } from '@material-ui/core/withWidth';



class RecipeForm extends React.Component {

  getIngredientNameInput() {
    return (
      <TextInput
        name='ingredientName'
        label='Składnik'
        value={this.props.ingredient ? this.props.ingredient.name : ''}
        handleChange={this.props.handleIngredientNameInputChange}
      />
    );
  }

  getIngredientAmountInput() {
    return (
      <TextInput
        name='ingredientAmount'
        label='Ilość'
        value={this.props.ingredient ? this.props.ingredient.amount : ''}
        handleChange={this.props.handleIngredientAmountInputChange}
      />
    );
  }

  getIngredientUnitInput() {
    return (
      <TextInput
        name='ingredientUnit'
        label='Jednostka'
        value={this.props.ingredient ? this.props.ingredient.unit : ''}
        handleChange={this.props.handleIngredientUnitInputChange}
      />
    );
  }

  getIngredientButton() {
    // return (<Button onClick={this.props.handleAddIngredient}>Dodaj</Button>);
    return (
      <IconButton
        aria-label="Dodaj"
        onClick={this.props.handleAddIngredient}>
        <AddIcon/>
      </IconButton>
    );
  }


  getIngredientFormDesktop() {
    return (
      <TableRow>
        <TableCell>{this.getIngredientNameInput()}</TableCell>
        <TableCell>{this.getIngredientAmountInput()}</TableCell>
        <TableCell>{this.getIngredientUnitInput()}</TableCell>
        <TableCell>{this.getIngredientButton()}</TableCell>
      </TableRow>
    );
  }

  getIngredientTable() {
    return(
      <IngredientTable
        items={this.props.recipe.ingredients}
        width={this.props.width}
        handleRemove={this.props.handleRemoveIngredient}
        ingredientFormDesktop={this.getIngredientFormDesktop()}
      />
    );
  }

  getIngredientList() {

    return (<div>
      {this.getIngredientTable()}
    </div>);
  }

  render() {
    return (
      <div className="recipe-form-placeholder">
        <Grid container>
          <Grid item xs={1} md={2}/>
          <Grid item xs={10} md={8}>
            <TextInput
              data-test='nameInput'
              name='recipeName'
              value={this.props.recipe ? this.props.recipe.name : ''}
              label='Nazwa'
              handleChange={this.props.handleNameInputChange}
            />
          </Grid>
          <Grid item xs={1} md={2}/>
          <Grid item xs={1} md={2}/>
          <Grid item xs={10} md={8}>
            <TextInput
              data-test='descriptionInput'
              name='recipeDescription'
              value={this.props.recipe ? this.props.recipe.description : ''}
              label='Uwagi'
              handleChange={this.props.handleDescriptionInputChange}
            />
          </Grid>
          <Grid item xs={1} md={2}/>
          <Grid item xs={1} md={2}/>
          <Grid item xs={10} md={8}>
            <FormControl fullWidth={true}  variant="outlined">
              <Select
                label='Posiłek'
                value={this.props.recipe.type ? this.props.recipe.type : null}
                onChange={this.props.handleTypeChange}
                input={<Input id="type"/>}
              >
                <MenuItem key='breakfast' value='breakfast'>Śniadanie</MenuItem>
                <MenuItem key='lunch' value='lunch'>Obiad</MenuItem>
                <MenuItem key='desert' value='desert'>Deser</MenuItem>
                <MenuItem key='dinner' value='dinner'>Kolacja</MenuItem>
                <MenuItem key='snack' value='snack'>Przekąski</MenuItem>
                <MenuItem key='add' value='add'>Dodatki</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {this.getIngredientList()}
      </div>
    );

  }

}

// export default RecipeForm;
export default withWidth()(RecipeForm);
