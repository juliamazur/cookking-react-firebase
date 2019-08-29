import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const Container = styled.div`
`;
const CardContainer = styled.div`
  margin: 15px 5px;
`;

const styles = theme => ({
    avatar: {
      cursor: 'pointer',
    },
    cardContent: {
      fontFamily: 'Montserrat, arial' // hack - mui set font family doesn't work very well with react app
    },
});

class Item extends React.Component {

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

        if(this.state.animation) {
            return (
                <Avatar className={classes.avatar}>
                    <ClearIcon
                        onClick={() => this.props.handleRemoveItem(this.props.item.id)}
                    />
                </Avatar>
            );
        }

        return (
            <Avatar
                className={classes.avatar}
                alt=''
                src={this.props.item.recipe.imageUrl}
            />
        );
    }

  renderAvatarIcon() {
    const { classes } = this.props;

    return (
        <Avatar className={classes.avatar}>
          <ClearIcon
            onClick={() => this.props.handleRemoveItem(this.props.item.id)}
          />
        </Avatar>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
          <CardContainer>
            <Card
                onMouseOver={this.animateStart}
                onMouseOut={this.animateStop}
            >
              <CardContent className={classes.cardContent}>{this.props.item.recipe.name}</CardContent>
              <CardActions disableActionSpacing>
                <IconButton aria-label="Usuń" onClick={() => this.props.handleRemoveItem(this.props.item.id)}>
                  <ClearIcon />
                </IconButton>
              </CardActions>
            </Card>
            </CardContainer>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default withStyles(styles)(Item);
