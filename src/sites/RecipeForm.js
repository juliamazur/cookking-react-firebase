import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import md5 from 'md5';

import { recipeRef, storageRef } from '../config/firebase'
import IntegrationDownshift from '../components/recipe_form/IngredientSelectDownshift'
import NameInput from '../components/recipe_form/NameInput'
import SubmitButton from '../components/recipe_form/SubmitButton'
import DescriptionInput from "../components/recipe_form/DescriptionInput";
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
            ingredients: this.props.recipe.ingredients ? this.props.recipe.ingredients : [],
            meals: this.props.recipe.meals ? this.props.recipe.meals : [],
        });
    }

    handleNameChange = event => {
        let recipe = {...this.state.recipe};
        recipe.name = event.target.value;
        this.setState({ recipe: recipe });
    };

    handleDescriptionChange = event => {
        let recipe = {...this.state.recipe};
        recipe.description = event.target.value;
        this.setState({ recipe: recipe });
    };

    handleDownshiftIngredientChange = label => {
        let recipe = {...this.state.recipe};
        const ingredients = recipe.ingredients ? recipe.ingredients : [];
        const newIngredient = ingredientsFixture.filter(el => el.label === label);
        const newIngredientId = newIngredient[0].id;

        if(ingredients.includes(newIngredientId)) {
            this.setState({ alert: 'Składnik nie został dodany, ponieważ jest już na liście.' });
            window.setTimeout(() => {
                this.setState({alert: null});
            }, 3000);
            return;
        }

        recipe.ingredients = [...ingredients, newIngredientId];

        this.setState({ recipe: recipe });

    };

    // TODO wtf
    handleMealChange = name => event => {
        let recipe = {...this.state.recipe};
        const meals = recipe.meals ? recipe.meals : [];
        if(meals.includes(event.target.value)) {
            return;
        }

        recipe.meals = [...meals, event.target.value];
        this.setState({ recipe: recipe });
    };

    handleIngredientDelete = id => () => {
        let recipe = {...this.state.recipe};
        const ingredients = recipe.ingredients.filter(el => el !== id);
        recipe.ingredients = ingredients;
        this.setState({ recipe: recipe });
    };

    handleMealDelete = id => () => {
        let recipe = {...this.state.recipe};
        const meals = recipe.meals.filter(el => el !== id);
        recipe.meals = meals;
        this.setState({ recipe: recipe });
    };

    handleImageChange = event => {
        if ((event.target.files[0])) {
            const image = event.target.files[0];
            const imageExt = image.name.split('.').pop();
            const d = new Date();
            const imageName = md5(d.getTime()) + '.' + imageExt;

            let recipe = {...this.state.recipe};

            recipe.image = image;
            recipe.imageUrl = URL.createObjectURL(image);
            recipe.imageName = imageName;

            this.setState({ recipe: recipe });
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
        if (this.props.edit) {
            this.editRecipe(this.props.id, this.state.recipe);
        } else {
            this.addRecipe(this.state.recipe);
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
                        <Grid item xs={12} lg={6}>
                            <ImageEdit
                                imageUrl={this.state.imageUrl}
                                handleImageChange={this.handleImageChange}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <NameInput
                                name={this.state.name}
                                handleNameChange={this.handleNameChange}
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
                            <DescriptionInput
                                description={this.state.description}
                                handleDescriptionChange={this.handleDescriptionChange}
                            />
                            <SubmitButton
                                handleFormSubmit={this.handleFormSubmit}
                            />
                        </Grid>
                        <h4>Składniki</h4>
                        <IngredientList
                            ingredients={this.state.ingredients}
                            handleIngredientDelete={this.handleIngredientDelete}
                        />
                    </Grid>
                </Paper>
            </div>
        );

    }

}

export default withStyles(styles)(RecipeForm);
