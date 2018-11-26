import React, { Component } from "react";
import _ from "lodash";
import styled from 'styled-components';

import RecipeCardCompact from "./RecipeCardCompact";

import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  margin: 30px auto;
  max-height: 620px;
  overflow-y: scroll;
`;

class RecipeLibrary extends Component {

    editRecipe = id => {
        console.log('EDIT recipe RecipeList: ', id);
        this.props.appEditCallback(id);
    };

    forkRecipe = id => {
        console.log('FORK recipe RecipeList: ', id);
        this.props.appForkCallback(id);
    };

    renderRecipiesCompact() {
        const { recipeList } = this.props;
        const recipies = _.map(recipeList, (value, key) => {
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

    render() {
        return (
            <Container className="recipe-list-placeholder">
                <Grid container>
                    {this.renderRecipiesCompact()}
                </Grid>
            </Container>
        );
    }
}

export default RecipeLibrary;