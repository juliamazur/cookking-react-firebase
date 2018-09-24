import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
// import { withStyles } from '@material-ui/core/styles';

import * as actions from "../actions";
import RecipeCard from "./RecipeCard";

import Grid from '@material-ui/core/Grid';

// const styles = theme => ({
// });

class RecipeList extends Component {
  // state = {
  // };

  renderRecipies() {
    const { data } = this.props;
    const recipies = _.map(data, (value, key) => {
      return <RecipeCard key={key} id={key} item={value} />;
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
          {this.renderRecipies()}
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
