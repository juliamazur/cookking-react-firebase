import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import RecipeLibrary from "../RecipeLibrary";

// import meals from '../../fixtures/meals.json';


function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography component="div" hidden={value !== index} style={{padding: 8 * 3}}  {...other}>
      {children}
    </Typography>
  );
}

class RecipeListTabs extends React.Component {

  const
  OTHER = 'other';

  state = {
    value: 0,
    recipeList: this.getFilteredRecipeList(0)
  };

  getFilteredRecipeList(value) {
    const meal=this.props.meals.find(meal => meal.id === value);
    if(!meal) {
      return [];
    }

    if(meal.tag === this.OTHER) {
      return this.props.recipeList.filter(recipe => !recipe.type);
    }

    return this.props.recipeList.filter(recipe => recipe.type === meal.tag);
  }

  handleChange = (event, value) => {
    const recipeListFiltered = this.getFilteredRecipeList(value);
    this.setState({
      value: value,
      recipeList: recipeListFiltered
    });
  };

  render() {
    const {value} = this.state;
    const {meals, content} = this.props;

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            {meals.map((meal) =>
              <Tab key={meal.id} label={meal.label}/>
            )}
          </Tabs>
        </AppBar>
        {meals.map((meal) =>
          <TabPanel value={value} index={meal.id}>
            <RecipeLibrary
              recipeList={this.state.recipeList}
              meals={this.props.meals}
              handleDeleteRecipe={this.props.deleteRecipe}
              handleEditRecipe={this.props.editRecipe}
              handleAddToSchedule={this.props.addToSchedule}
              handleAvatarClick={this.props.changeAvatar}
              pickedMeal={value}
            />
          </TabPanel>
        )}
      </div>
    );
  }
}

export default RecipeListTabs;
