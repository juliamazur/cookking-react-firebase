import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
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
              <CardHeader
                avatar={this.renderAvatar()}
                title={this.props.item.recipe.name}
              />
            </Card>
            </CardContainer>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default withStyles(styles)(Item);
