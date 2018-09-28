import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
// import { withStyles } from '@material-ui/core/styles';

import * as actions from "../actions";
import RecipeCard from "./RecipeCard";
import RecipeCardCompact from "./RecipeCardCompact";
import RecipeCardMini from "./RecipeCardMini";

import Grid from '@material-ui/core/Grid';

// const styles = theme => ({
// });

class RecipeList extends Component {

  editRecipe = id => {
    console.log('EDIT recipe RecipeList: ', id);
    this.props.appEditCallback(id);
  };

  forkRecipe = id => {
    console.log('FORK recipe RecipeList: ', id);
    this.props.appForkCallback(id);
  };

  renderRecipies() {
    const { data } = this.props;
    const recipies = _.map(data, (value, key) => {
      return <RecipeCard key={key} id={key} item={value} callbackEditRecipe={this.editRecipe} callbackForkRecipe={this.forkRecipe}/>;
    });
    if (!_.isEmpty(recipies)) {
      return recipies;
    }
    return (
      <div>
        <h4>Nie masz jeszcze żadnych przepisów.</h4>
      </div>
    );
  }

  renderRecipiesCompact() {
    const { data } = this.props;
    const recipies = _.map(data, (value, key) => {
      return <RecipeCardCompact key={key} id={key} item={value} callbackEditRecipe={this.editRecipe} callbackForkRecipe={this.forkRecipe}/>;
    });
    if (!_.isEmpty(recipies)) {
      return recipies;
    }
    return (
      <div>
        <h4>Nie masz jeszcze żadnych przepisów.</h4>
      </div>
    );
  }

  renderRecipiesMini() {
    const { data } = this.props;
    const recipies = _.map(data, (value, key) => {
      return <RecipeCardMini key={key} id={key} item={value} callbackEditRecipe={this.editRecipe} callbackForkRecipe={this.forkRecipe}/>;
    });
    if (!_.isEmpty(recipies)) {
      return recipies;
    }
    return (
      <div>
        <h4>Nie masz jeszcze żadnych przepisów.</h4>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchRecipeList();
  }

  render() {
    return (
      <div className="recipe-list-placeholder">
        <Grid container>
          {this.renderRecipiesMini()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(RecipeList);
