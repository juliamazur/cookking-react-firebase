import React, { Component } from "react";
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import {scheduleItemRef} from "../config/firebase";

const Container = styled.div`
  margin: 10px;
`;

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
            <Container>
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
            </Container>
        );
    }
}

export default RecipeCardMini;