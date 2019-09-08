import React from 'react';
import TextInput from '../components/form/TextInput';
import Button from '@material-ui/core/Button';
import SubmitButton from '../components/recipe_form/SubmitButton';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

class RecipeForm extends React.Component {

  render() {

    return (
      <div className="recipe-form-placeholder">
        <Grid container spacing={32}
        >
          <Grid item xs={12}>
            <TextInput
              data-test='nameInput'
              name='recipeName'
              value={this.props.recipe ? this.props.recipe.name : ''}
              label='Nazwa'
              handleChange={this.props.handleNameInputChange}
            />
            <TextInput
              data-test='descriptionInput'
              name='recipeDescription'
              value={this.props.recipe ? this.props.recipe.description : ''}
              label='Opis'
              handleChange={this.props.handleDescriptionInputChange}
            />
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Składnik</TableCell>
                  <TableCell>Ilość</TableCell>
                  <TableCell>Jednostka</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextInput
                      name='ingredientName'
                      value={this.props.ingredient ? this.props.ingredient.name : ''}
                      handleChange={this.props.handleIngredientNameInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextInput
                      name='ingredientAmount'
                      value={this.props.ingredient ? this.props.ingredient.amount : ''}
                      handleChange={this.props.handleIngredientAmountInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextInput
                      name='ingredientUnit'
                      value={this.props.ingredient ? this.props.ingredient.unit : ''}
                      handleChange={this.props.handleIngredientUnitInputChange}
                    />
                  </TableCell>
                  <TableCell><Button onClick={this.props.handleAddIngredient}>Dodaj</Button></TableCell>
                </TableRow>
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
          </Grid>
        </Grid>
        <Grid>&nbsp;</Grid>
        <Grid>
          <SubmitButton
            handleFormSubmit={this.props.handleSubmit}
          />
        </Grid>
      </div>
    );

  }

}

export default RecipeForm;