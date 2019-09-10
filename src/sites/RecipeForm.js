import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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
import SpaIcon from '@material-ui/icons/Spa';
import CakeIcon from '@material-ui/icons/Cake';
import WhatsHotIcon from '@material-ui/icons/Whatshot';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import BrightnessIcon from '@material-ui/icons/Brightness5';
import { Avatar } from '@material-ui/core';

const styles = theme => ({
  avatar: {
    cursor: 'pointer',
    width: 50,
    height: 50,
    float: 'left',
    marginLeft: '-10px',
    opacity: '0.6'
  },
  brightness: {
    backgroundColor: '#fcf678'
  },
  cake: {
    backgroundColor: '#e7cd76'
  },
  fastfood: {
    backgroundColor: '#e7bb78'
  },
  whatshot: {
    backgroundColor: '#f99a9c'
  },
  favorite: {
    backgroundColor: '#e7a7d2'
  },
  star: {
    backgroundColor: '#8ba2e7'
  },
  roomservice: {
    backgroundColor: '#89cbe7'
  },
  restaurant: {
    backgroundColor: '#88e7db'
  },
  breakfast: {
    backgroundColor: '#9ee79d'
  },
  spa: {
    backgroundColor: '#cce796'
  },
  active: {
    opacity: 1
  }
});

class RecipeForm extends React.Component {

  displayAvatar(classes, type) {
    return (
      <Avatar
        className={classes.avatar + ' ' + ' ' + classes[type] + ' ' + (this.props.recipe.type === type ? classes.active : '')}
        onClick={() => {this.props.setType(type);}}
      >
        {type === 'cake' ? (<CakeIcon/>) : ''}
        {type === 'fastfood' ? (<FastFoodIcon/>) : ''}
        {type === 'whatshot' ? (<WhatsHotIcon/>) : ''}
        {type === 'favorite' ? (<FavoriteBorderIcon/>) : ''}
        {type === 'star' ? (<StarBorderIcon/>) : ''}
        {type === 'roomservice' ? (<RoomServiceIcon/>) : ''}
        {type === 'restaurant' ? (<RestaurantIcon/>) : ''}
        {type === 'breakfast' ? (<FreeBreakfastIcon/>) : ''}
        {type === 'spa' ? (<SpaIcon/>) : ''}
        {type === 'brightness' ? (<BrightnessIcon/>) : ''}
      </Avatar>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="recipe-form-placeholder">
        <Grid container spacing={32}
        >
          <Grid item xs={12}>
            {this.displayAvatar(classes, 'brightness')}
            {this.displayAvatar(classes, 'cake')}
            {this.displayAvatar(classes, 'fastfood')}
            {this.displayAvatar(classes, 'whatshot')}
            {this.displayAvatar(classes, 'favorite')}
            {this.displayAvatar(classes, 'star')}
            {this.displayAvatar(classes, 'roomservice')}
            {this.displayAvatar(classes, 'restaurant')}
            {this.displayAvatar(classes, 'breakfast')}
            {this.displayAvatar(classes, 'spa')}
          </Grid>
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

export default withStyles(styles)(RecipeForm);