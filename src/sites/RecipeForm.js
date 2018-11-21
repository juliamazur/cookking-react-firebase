import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import md5 from 'md5';

import { recipeRef, storageRef } from '../config/firebase'
import IntegrationDownshift from '../components/recipe_form/IngredientSelectDownshift'
import Input from '../components/form/TextInput'
import SubmitButton from '../components/recipe_form/SubmitButton'
import MealSelect from "../components/recipe_form/MealSelect";
import MealList from "../components/recipe_form/MealList";
import IngredientList from "../components/recipe_form/IngredientList";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ingredientsFixture from '../fixtures/ingredients.json';
import ImageEdit from "../components/recipe_form/ImageEdit";

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
    }
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
        //this.resetState();
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
                <Paper className={classes.container}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <ImageEdit
                            imageUrl={this.state.imageUrl}
                            handleImageChange={this.handleImageChange}
                        />
                        <IngredientList
                            ingredients={this.state.ingredients}
                            handleIngredientDelete={this.handleIngredientDelete}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Input
                          data-test='nameInput'
                          name='name'
                          value={this.state.name}
                          label='Nazwa'
                          handleChange={this.handleInputChange}
                        />

                        <p>{this.state.alert}</p>

                        <IntegrationDownshift
                            handleDownshiftIngredientChange={this.handleDownshiftIngredientChange}
                        />
                        <MealList
                            meals={this.state.meals}
                            handleMealDelete={this.handleMealDelete}

                        />
                        <MealSelect
                            meal={this.state.meal}
                            handleMealChange={this.handleMealChange}
                        />
                      <Input
                        data-test='descInput'
                        name='description'
                        value={this.state.description}
                        label='Opis'
                        handleChange={this.handleInputChange}
                      />
                        <SubmitButton
                            handleFormSubmit={this.handleFormSubmit}
                        />
                    </Grid>

                </Grid>
                </Paper>
            </div>
        );

    }

}

export default withStyles(styles)(RecipeForm);