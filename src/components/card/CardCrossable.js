import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import CardBasic from "./CardBasic";
import CheckIcon from '@material-ui/icons/CheckCircle';

const styles = theme => ({
  card: {
    cursor: 'pointer'
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
    // @TODO DRY
    if(noIcon) {
      return (
        <div>
          <span className={isActive ? classes.contentActive : classes.content}>{content}</span>
        </div>
      );
    }
    return (
      <div>
        <span className={isActive ? classes.contentActive : classes.content}>{content}</span>
        <CheckIcon className={isActive ? classes.checkIconActive : classes.checkIcon}/>
      </div>
    );
  }


  render() {
    const {id, content, noIcon, classes} = this.props;

    return (
      <div
        className={classes.card}
        onClick={this.handleClick}
      >
        <CardBasic
          key={id}
          id={id}
          content={this.getContent(content, noIcon, classes, this.state.isActive)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(CardCrossable);