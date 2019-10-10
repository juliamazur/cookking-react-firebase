import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import RecipeLibrary from "../RecipeLibrary";


function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography component="div" hidden={value !== index} style={{padding: 8 * 3}}  {...other}>
      {children}
    </Typography>
  );
}

class RecipeListTabs extends React.Component {

  render() {
    const {meals, value, recipeList, handleChange} = this.props;

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            {meals.map((meal) =>
              <Tab key={meal.id} label={meal.label}/>
            )}
          </Tabs>
        </AppBar>
        {meals.map((meal) =>
          <TabPanel value={value} index={meal.id}>
            <RecipeLibrary
              recipeList={recipeList}
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
