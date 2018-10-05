import React, { Component } from "react";
import { connect } from "react-redux";

import { storageRef } from '../config/firebase'
import { recipeRef } from "../config/firebase";
import md5 from 'md5';

// import _ from "lodash";
import { withStyles } from '@material-ui/core/styles';

import * as actions from "../actions";

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import AddIcon from '@material-ui/icons/Add';

import AddIngredient from './AddIngredient';
import styled from "styled-components";

const styles = theme => ({

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 900,
    padding: theme.spacing.unit * 2,
    marginTop: 45,
    marginBottom: 45,
  },
  button: {
      margin: '40px auto',
  },
  mainImage: {
    maxWidth: '80%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  },
  mainImageDummy: {
    maxWidth: '70%',
      marginTop: 20,
      marginBottom: 10,
      borderRadius: 10,
      boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    padding: '5%',
    opacity: '0.9',
  },
  cardTitle: {
  }
  // formControl: {
  //   margin: theme.spacing.unit,
  // },
  // button: {
  //   margin: theme.spacing.unit,
  // },
  // input: {
  //   display: 'none',
  // },
  // card: {
  //   maxWidth: 400,
  //   margin: 'auto',
  //   marginTop: 25,
  // },
  // media: {
  //   height: 0,
  //   paddingTop: '56.25%', // 16:9
  // },
});

const ImageContainer = styled.div`
    max-width: 300px;
    max-height: 300px;
    overflow: hidden;
    margin: 0 auto;
    text-align: center;
`;


class RecipeForm extends Component {

  state = {
    name: '',
    description: '',
    ingredients: [],
    image: null,
    imageName: '',
    imageUrl: '',
  };

  setInitialState = () => {
    const initialState = {
      name: '',
      description: '',
      ingredients: [],
      image: null,
      imageName: '',
      imageUrl: '',
    }
    this.setState(initialState);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id === prevProps.id && this.props.edit === prevProps.edit) {
      return false;
    }
    
      console.log('RecipeForm, ID dectected: ' + this.props.id);
      if (this.props.edit) {
        console.log('RecipeForm, Recipe will be EDITED');
      } else {
        console.log('RecipeForm, Recipe will be FORKED');
      }
      // @TODO use fetchRecipe from actions
      recipeRef.child(this.props.id).on("value", snapshot => {
        const recipeFromBase = snapshot.val();
        console.log(recipeFromBase);
        this.setState({
          name: recipeFromBase.name,
          description: recipeFromBase.description,
          ingredients: recipeFromBase.ingredients,
          imageUrl: recipeFromBase.imageUrl,
         });
      });
  }

  ingredientsCallback = (ingredients) => {
        this.setState({ ingredients: ingredients });
        // console.log('INGREDIENTS (callback): ', ingredients);
    };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  handleImageChange = event => {
    if ((event.target.files[0])) {
      const image = event.target.files[0];
      const imageExt = image.name.split('.').pop();
      const d = new Date();
      const imageName = md5(d.getTime()) + '.' + imageExt;

      this.setState({
        image: image,
        imageUrl: URL.createObjectURL(image),
        imageName: imageName,
      })
    }
  };

  handleFormSubmit = event => {
    if (this.state.image) {
      const imageRef = storageRef.child(this.state.imageName);
      const uploadTask = imageRef.put(this.state.image);
      const saveToDB = this.saveToDB;

      uploadTask.on('state_changed', function(snapshot, saveToDB) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          saveToDB(downloadURL);
        });
      });
    } else {
      this.saveToDB('');
    }
  };

  saveToDB = newImageUrl => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      ingredients: this.state.ingredients,
      imageUrl: newImageUrl ? newImageUrl : this.state.imageUrl,
    };

    if (this.props.edit) {
      this.props.editRecipe(this.props.id, data);
    } else {
      this.props.addRecipe(data);
    }

    this.setInitialState();
  }

  renderAddForm = (classes) => {

      let image;

      if (this.state.imageUrl) {
        image = <img className={classes.mainImage} src={this.state.imageUrl} alt = ''/>;
      } else {
        image = <img className={classes.mainImageDummy} src="/static/images/icons/fried-rice.png" alt = ''/>;
      }

      return (
        <Grid container>
        <Grid item xs={12} lg={6}>
        <ImageContainer>{image}</ImageContainer>
            <h4>Edytuj obrazek</h4>
            <input
            accept="image/*"
            id="button-file"
            multiple
            type="file"
            onChange={this.handleImageChange}
          />
          </Grid>
          <Grid item xs={12} lg={6}>
        <FormControl fullWidth={true}>
            <h3 className={classes.cardTitle}>Edytuj przepis</h3>
            <TextField
              id="recipe-name"
              value={this.state.name}
              label="Nazwa przepisu"
              placeholder="Wpisz nazwę przepisu"
              margin="normal"
              onChange={this.handleNameChange}
            />
          </FormControl>
          <AddIngredient ingredients={this.state.ingredients} callbackFromParent={this.ingredientsCallback}/>
          <FormControl fullWidth={true}>
                <TextField
                  id="recipe-description"
                  value={this.state.description}
                  label="Opis przepisu"
                  multiline
                  rows={3}
                  onChange={this.handleDescriptionChange}
                />
          </FormControl>
              <Button className={classes.button} variant="contained" color="primary" onClick={this.handleFormSubmit}>
                  Zapisz
              </Button>
        </Grid>
        </Grid>
      );
  };

  componentWillMount() {
    //this.props.fetchRecipeList();
  }

  render() {

    const { classes } = this.props;

    return (
      <div className="recipe-form-placeholder">
          <Paper className={classes.container}>
            {this.renderAddForm(classes)}

          </Paper>
        </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(withStyles(styles)(RecipeForm));
