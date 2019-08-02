import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import AddIcon from '@material-ui/icons/Add';

const Container = styled.div`
  margin: 10px;
  float: left;
  cursor: pointer;
`;

const styles = theme => ({
    card: {
        transition: 'background-color .25s ease-in-out',
        '&:hover': {
            backgroundColor: '#eee',
        },
    },
    avatar: {
    },
});

class RecipeCardMini extends Component {

    state  = {
        animation: false,
    };

    animateStart = () => {
      this.setState({ animation: true });
    }

    animateStop = () => {
        this.setState({ animation: false });
    }

    renderAvatar() {
        const { classes } = this.props;
        const { item } = this.props;

        if(this.state.animation) {
            return (
                <Avatar className={classes.addAvatar}>
                    <AddIcon />
                </Avatar>
            );
        }

        return (
            <Avatar
                className={classes.avatar}
                alt=''
                src={item.imageUrl}
            />
        );
    }

    render() {
        const { classes } = this.props;
        const { id, item } = this.props;

        return (
            <Container>
                <Card
                    className={classes.card}
                    onMouseOver={this.animateStart}
                    onMouseOut={this.animateStop}
                    onClick={() => this.props.handleUseRecipe(id)}
                >
                    <CardHeader
                        avatar={
                          <Avatar className={classes.addAvatar}>
                            <AddIcon />
                          </Avatar>
                        }
                        title={item.name}
                    />
                </Card>
            </Container>
        );
    }
}

export default withStyles(styles)(RecipeCardMini);