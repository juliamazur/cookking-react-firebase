import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import RecipeList from "./RecipeList";

import mealsFixture from '../fixtures/meals.json';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class RecipeListTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        {mealsFixture.map((meal, key)  =>
                            <Tab key={key} label={meal.name} />
                        )}
                    </Tabs>
                </AppBar>
                {mealsFixture.map((meal, key)  =>
                    value === meal.id &&
                    <TabContainer key={0}   >
                        <RecipeList
                            key={key}
                            mealId={meal.id}
                            recipeList={this.props.recipeList}
                            appEditCallback={this.props.appEditCallback}
                            appForkCallback={this.props.appForkCallback}
                        />
                    </TabContainer>
                )}
            </div>
        );
    }
}

export default RecipeListTabs;
