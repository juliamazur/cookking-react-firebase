import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import CheckIcon from '@material-ui/icons/CheckCircle';
import Card from '@material-ui/core/Card';

import CardHeader from '@material-ui/core/CardHeader';
import {Avatar} from '@material-ui/core';


const styles = theme => ({
  card: {
    cursor: 'pointer'
  },
  avatar: {
    backgroundColor: 'white'
  },
  checkIcon: {
    color: '#3abea0',
    fontSize: '1.2rem',
    float: 'right'
  },
  checkIconActive: {
    color: '#bbb',
    fontSize: '1.2rem',
    float: 'right'
  },
  contentActive: {},
  content: {
    color: '#ccc',
    textDecoration: 'line-through'
  }
});


class CardCrossable extends Component {

  state = {isActive: true};

  handleClick = () => {
    this.setState(state => ({isActive: !state.isActive}));
  }

  getContent(content, noIcon, classes, isActive) {

      return (
        <div>
          <span className={isActive ? classes.contentActive : classes.content}>{content}</span>
        </div>
      );

  }


  render() {
    const {id, content, noIcon, classes} = this.props;

    return (
      <Card
        key={id}
        className={classes.card}
        onClick={this.handleClick}
      >
        <CardHeader
          avatar={<Avatar
            className={classes.avatar}
          >
            <CheckIcon className={this.state.isActive ? classes.checkIconActive : classes.checkIcon}/>
          </Avatar>}
          title={this.getContent(content, noIcon, classes, this.state.isActive)}
        />
      </Card>
    );
  }
}

export default withStyles(styles)(CardCrossable);
