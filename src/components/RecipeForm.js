import React, { Component } from "react";
import { connect } from "react-redux";
import { storageRef } from '../config/firebase'
import { recipeRef } from "../config/firebase";
import md5 from 'md5';
// import _ from "lodash";
// import { withStyles } from '@material-ui/core/styles';

import * as actions from "../actions";

// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import AddIcon from '@material-ui/icons/Add';

import AddIngredient from './AddIngredient';

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     flexGrow: 1,
//     margin: 'auto',
//     maxWidth: 900,
//     padding: theme.spacing.unit * 2,
//     marginTop: 45,
//     marginBottom: 45,
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//   },
//   button: {
//     margin: theme.spacing.unit,
//   },
//   input: {
//     display: 'none',
//   },
//   card: {
//     maxWidth: 400,
//     margin: 'auto',
//     marginTop: 25,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
// });


class RecipeForm extends Component {

  state = {
    name: '',
    description: '',
    image: null,
    imageName: '',
    imageUrl: '',
    ingredients: [],
  };


  componentDidUpdate(prevProps) {
    if (this.props.editRecipeId !== prevProps.editRecipeId) {
      //this.fetchData(this.props.userID);
      console.log('RecipeForm, new ID dectected: ' + this.props.editRecipeId);
      recipeRef.child(this.props.editRecipeId).on("value", snapshot => {
        const recipeToEdit = snapshot.val();
        console.log(recipeToEdit);
        this.setState({
          name: recipeToEdit.name,
          description: recipeToEdit.description,
          ingredients: recipeToEdit.ingredients,
         });
      });
      //this.props.fetchRecipeList();
      //this.props.fetchRecipe(this.props.editRecipeId).then(() => {
        //console.log(this.state);
      //});
      //console.log('recipeToEdit: ' + recipeToEdit)
    }
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
    const {addRecipe} = this.props;

    const name = this.state.name;
    const description = this.state.description;
    const imageName = this.state.imageName;
    const ingredients = this.state.ingredients;

    console.log('INGREDIENTS: ', ingredients);

    if (this.state.image) {
      const imageRef = storageRef.child(this.state.imageName);
      const uploadTask = imageRef.put(this.state.image);

      uploadTask.on('state_changed', function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          addRecipe({
            name: name,
            description: description,
            imageName: imageName,
            imageUrl: downloadURL,
            ingredients: ingredients,
           });
        });
      });
    } else {
      addRecipe({
        name: name,
        description: description,
        ingredients: ingredients,
       });
    }

    this.setState({
      name: '',
      description: '',
      image: null,
      imageName: '',
      imageUrl: '',
    });
  };

  renderAddForm = () => {

      return (
        <Grid item xs={12} lg={6}>
        <img src={this.state.imageUrl} alt=''/>
        <input
            accept="image/*"
            id="button-file"
            multiple
            type="file"
            onChange={this.handleImageChange}
          />
          <label htmlFor="button-file">
            <Button variant="fab" color="primary" component="span" >
              <AddIcon />
            </Button>
          </label>
        <FormControl fullWidth={true}>
            <TextField
              id="recipe-name"
              value={this.state.name}
              label="Nazwa przepisu"
              placeholder="Wpisz nazwę przepisu"
              margin="normal"
              onChange={this.handleNameChange}
            />
          </FormControl>
          <AddIngredient callbackFromParent={this.ingredientsCallback}/>
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
        </Grid>
      );
  };

  componentWillMount() {
    this.props.fetchRecipeList();
  }

  render() {

    return (
      <div className="recipe-form-placeholder">
          <Grid container>
          <Grid item xs={12}>&nbsp;</Grid>
            {this.renderAddForm()}
            <Grid item xs={12}>&nbsp;</Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>
              Zapisz
            </Button>
            </Grid>
          </Grid>
        </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(RecipeForm);
