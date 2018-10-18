import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import md5 from 'md5';

import { recipeRef, storageRef } from '../config/firebase'
import IntegrationDownshift from '../components/recipe_form/IngredientSelectDownshift'
import NameInput from '../components/recipe_form/NameInput'
import SubmitButton from '../components/recipe_form/SubmitButton'
import DescriptionInput from "../components/recipe_form/DescriptionInput";
import MealSelect from "../components/recipe_form/MealSelect";
import MealList from "../components/recipe_form/MealList";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClearIcon from '@material-ui/icons/Clear';

import ingredientsFixture from '../fixtures/ingredients.json';

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
    }
});


const ImageContainer = styled.div`
    max-width: 400px;
    max-height: 400px;
    overflow: hidden;
`;

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
        this.setState({ name: event.target.value });
    };

    handleDescriptionChange = event => {
        this.setState({ description: event.target.value });
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

    handleIngredientChange = event => {
        const ingredients = this.state.ingredients;

        if(ingredients.includes(event.target.value)) {
            this.setState({ alert: 'Składnik nie został dodany, ponieważ jest już na liście.' });
            window.setTimeout(() => {
                this.setState({alert: null});
            }, 3000);
            return;
        }

        this.setState({ ingredients: [...ingredients, event.target.value] });
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

        this.props.clearForm();
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

        let image;
        if (this.state.imageUrl) {
            image = <img className={classes.mainImage} src={this.state.imageUrl} alt = ''/>;
        } else {
            image = <img className={classes.mainImageDummy} src="/static/images/icons/fried-rice.png" alt = ''/>;
        }

        return (
            <div className="recipe-form-placeholder">
                <Paper className={classes.container}>
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
                    <h4>Składniki</h4>
                    {
                        this.state.ingredients ? (
                            <List>
                                {this.state.ingredients.map(ingredient => {
                                    return (
                                        <ListItem button key={ingredient}>
                                            <ListItemIcon onClick={this.handleIngredientDelete(ingredient)}><ClearIcon/></ListItemIcon>
                                            {ingredientsFixture.filter(v => v.id === ingredient)[0].label}
                                        </ListItem>
                                    )
                                })
                                }
                            </List>

                        ) : ('')
                    }
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
            </Grid>
                </Paper>
            </div>
        );

    }

}

export default withStyles(styles)(RecipeForm);

