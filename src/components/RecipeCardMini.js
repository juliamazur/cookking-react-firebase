import React, { Component } from "react";

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import {scheduleItemRef} from "../config/firebase";

class RecipeCardMini extends Component {

    // TODO should be passed as callback to App
    useRecipe = id => {
        const data = {
            recipeId: id,
        };

       scheduleItemRef.push().set(data);
    }

    render() {
        const { id, item } = this.props;

        return (
            <Grid item xs={12} lg={2}>
                <Card>
                    <IconButton aria-label="Use" onClick={() => this.useRecipe(id)}>
                        <AddIcon />
                    </IconButton>
                    <CardHeader
                        avatar={
                            <Avatar
                                alt=''
                                src={item.imageUrl}
                            />
                        }
                        title={item.name}
                    />
                </Card>
            </Grid>
        );
    }
}

export default RecipeCardMini;