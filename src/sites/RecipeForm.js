import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import md5 from 'md5';

import { recipeRef, storageRef } from '../config/firebase'
import IntegrationDownshift from '../components/recipe_form/IngredientSelectDownshift'
import TextInput from '../components/form/TextInput'
// import FileInput from '../components/form/FileInput'
import SubmitButton from '../components/recipe_form/SubmitButton'
import MealSelect from "../components/recipe_form/MealSelect";
import MealList from "../components/recipe_form/MealList";
import IngredientList from "../components/recipe_form/IngredientList";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ingredientsFixture from '../fixtures/ingredients.json';
import ImageEdit from "../components/recipe_form/ImageEdit";

const styles = theme => ({
    container: {},
    ingredientList: {},
});

class RecipeForm extends React.Component {

    defaultState = {
        name: '',
        description: '',
        imageUrl: '',
        ingredient: '',
        ingredients: [],
        meal: '',
        meals: [],
        alert: null,
    };

    constructor(props) {
        super(props);

        this.state = this.defaultState;
        this.resetState();
    }

    resetState = () => {

        if(!this.props.recipe) {
            this.setState(this.defaultState);
            return;
        }

        // set state from props
        this.setState({
            name: this.props.recipe.name,
            description: this.props.recipe.description,
            imageUrl: this.props.recipe.imageUrl,
            ingredient: '',
            ingredients: this.props.recipe.ingredients ? this.props.recipe.ingredients : [],
            meals: this.props.recipe.meals ? this.props.recipe.meals : [],
        });
    }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

    handleDownshiftIngredientChange = label => {
        const ingredients = this.state.ingredients;
        const newIngredient = ingredientsFixture.filter(el => el.label === label);
        const newIngredientId = newIngredient[0].id;

        if(ingredients.includes(newIngredientId)) {
            this.setState({ alert: 'Składnik nie został dodany, ponieważ jest już na liście.' });
            window.setTimeout(() => {
                this.setState({alert: null});
            }, 3000);
            return;
        }

        this.setState({ ingredients: [...ingredients, newIngredientId] });

    };

    // TODO wtf
    handleMealChange = name => event => {
        if(this.state.meals.includes(event.target.value)) {
            return;
        }

        this.setState({ meals: [...this.state.meals, event.target.value] });
    };

    handleIngredientDelete = id => () => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.filter(el => el !== id)
        }));
    };

    handleMealDelete = id => () => {
        this.setState(prevState => ({
            meals: prevState.meals.filter(el => el !== id)
        }));
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
        this.props.handleClose();
    };

    addRecipe = newRecipe => {
        recipeRef.push().set(newRecipe);
    };

    editRecipe = (id, data) => {
        recipeRef.child(id).update(data);
    };

    saveToDB = newImageUrl => {
        const data = {
            name: this.state.name,
            description: this.state.description,
            ingredients: this.state.ingredients,
            meals: this.state.meals,
            imageUrl: newImageUrl ? newImageUrl : this.state.imageUrl,
        };

        if (this.props.edit) {
            this.editRecipe(this.props.id, data);
        } else {
            this.addRecipe(data);
        }

        this.resetState();
        this.props.callbackAfterSubmit();
    }

  handleFormCancel = () => {
    this.resetState();
    this.props.handleClose();
  };

  componentDidMount(prevProps) {
    this.resetState();
  }

    componentDidUpdate(prevProps) {
        if (this.props.recipe === prevProps.recipe
            && this.props.edit === prevProps.edit
            && this.props.fork === prevProps.fork) {
            return;
        }

        this.resetState();
    }

    render() {

        const { classes } = this.props;

        return (
            <div className="recipe-form-placeholder">
                <Grid container spacing={32}
                  className={classes.container}
                >
                    <Grid item xs={12}>


                      {this.state.alert}

                        <TextInput
                          data-test='nameInput'
                          name='name'
                          value={this.state.name}
                          label='Nazwa'
                          handleChange={this.handleInputChange}
                        />

                        <TextInput
                          data-test='descInput'
                          name='description'
                          value={this.state.description}
                          label='Opis'
                          handleChange={this.handleInputChange}
                        />

                      <MealSelect
                        meal={this.state.meal}
                        handleMealChange={this.handleMealChange}
                      />
                      <MealList
                        meals={this.state.meals}
                        handleMealDelete={this.handleMealDelete}

                      />

                      <IntegrationDownshift
                        handleDownshiftIngredientChange={this.handleDownshiftIngredientChange}
                      />

                    <IngredientList
                      className={classes.ingredientList}
                      ingredients={this.state.ingredients}
                      handleIngredientDelete={this.handleIngredientDelete}
                    />
                  </Grid>
                </Grid>
              <Grid
                justify='center'
                align='right'
              >
                <Button onClick={this.handleFormCancel} color="primary" autoFocus>
                  Anuluj
                </Button>

                <SubmitButton
                  handleFormSubmit={this.handleFormSubmit}
                />
              </Grid>
            </div>
        );

    }

}

export default withStyles(styles)(RecipeForm);