import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import ListRecipeCardMidi from "../card/ListRecipeCardMidi";
import ListRecipeCardMini from "../card/ListRecipeCardMini";


import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const styles = theme => ({
  container: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'space-evenly',
      margin: 30
    }
  }
});


class RecipeLibraryModal extends Component {

  state = {
    pickedList: []
  };

  handleClick(id) {
    let pickedList = this.state.pickedList;
    if(pickedList.includes(id)) {
      pickedList = pickedList.filter(e => e !== id)
    } else {
      pickedList.push(id);
    }
    this.setState({pickedList: pickedList});
  }


  renderRecipesCompact() {
    const {width, recipeList} = this.props;
    const recipes = recipeList.sort((a,b) => { return a.name > b.name ? 1 : -1; }).map((recipe) => {
      return <ListRecipeCardMini
        key={recipe.id}
        item={recipe}
        handleClick={() => this.handleClick(recipe.id)}
      />;
    });
    if (recipes.length) {
      return recipes;
    }
    return ('');
  }

  render() {

    const {classes} = this.props;
    const { open, title, fullScreen, width, content, onClose, handleSubmit } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          fullScreen={fullScreen || !isWidthUp('sm', width)}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
          <div className={classes.container}>
            {this.renderRecipesCompact()}
          </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={() => handleSubmit(this.state.pickedList)} color="primary" autoFocus>
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(RecipeLibraryModal);
