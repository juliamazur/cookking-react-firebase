import React from 'react';

import TextInput from '../components/form/TextInput';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import RecipeTypeAvatar from '../components/recipe_type_avatar/RecipeTypeAvatar';
import RecipeTypeAvatarBar from '../components/recipe_type_avatar/RecipeTypeAvatarBar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

class RecipeForm extends React.Component {

  displayAvatar(type) {
    return (
      <RecipeTypeAvatar
        type={type}
        active={(this.props.recipe.type === type)}
        onClick={this.props.setType}
      />
    );
  }

  render() {
    return (
      <div className="recipe-form-placeholder">
        {/*<RecipeTypeAvatarBar*/}
          {/*activeTypes={[this.props.recipe.type]}*/}
          {/*setActive={this.props.setType}*/}
        {/*/>*/}
        <Grid container>
          <Grid item xs={12}>
            <TextInput
              data-test='nameInput'
              name='recipeName'
              value={this.props.recipe ? this.props.recipe.name : ''}
              label='Nazwa'
              handleChange={this.props.handleNameInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              data-test='descriptionInput'
              name='recipeDescription'
              value={this.props.recipe ? this.props.recipe.description : ''}
              label='Opis'
              handleChange={this.props.handleDescriptionInputChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextInput
              name='ingredientName'
              label='Składnik'
              value={this.props.ingredient ? this.props.ingredient.name : ''}
              handleChange={this.props.handleIngredientNameInputChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextInput
              name='ingredientAmount'
              label='Ilość'
              value={this.props.ingredient ? this.props.ingredient.amount : ''}
              handleChange={this.props.handleIngredientAmountInputChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextInput
              name='ingredientUnit'
              label='Jednostka'
              value={this.props.ingredient ? this.props.ingredient.unit : ''}
              handleChange={this.props.handleIngredientUnitInputChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button onClick={this.props.handleAddIngredient}>Dodaj</Button>
          </Grid>
        </Grid>
        <Table>
          <TableBody>
            {
              this.props.recipe.ingredients ?
                this.props.recipe.ingredients.map((v, index) => (
                  <TableRow key={v.id}>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.amount}</TableCell>
                    <TableCell>{v.unit}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="Usuń"
                        onClick={() => this.props.handleRemoveIngredient(index)}>
                        <ClearIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                : ''}
          </TableBody>
        </Table>
      </div>
    );

  }

}

export default RecipeForm;