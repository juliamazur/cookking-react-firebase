import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import md5 from 'md5';

import { recipeRef, storageRef } from '../config/firebase'
import IngredientSelect from './recipe_form/IngredientSelect'

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClearIcon from '@material-ui/icons/Clear';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import ingredientsFixture from '../fixtures/ingredients.json';
import mealsFixture from '../fixtures/meals.json';

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
});


const ImageContainer = styled.div`
    max-width: 300px;
    max-height: 300px;
    overflow: hidden;
    margin: 0 auto;
    text-align: center;
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

    // TODO wtf
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

        this.props.callbackClearForm();
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
                    {
                      this.state.ingredients ? (
                        <List>
                            {this.state.ingredients.map(ingredient => {
                                return (
                                    <ListItem button key={ingredient}>
                                        <ListItemIcon onClick={this.handleIngredientDelete(ingredient)}><ClearIcon/></ListItemIcon>
                                        {ingredientsFixture.filter(v => v.id === ingredient)[0].name}
                                    </ListItem>
                                )
                            })
                            }
                        </List>

                    ) : ('')
                    }

                    <p>{this.state.alert}</p>

                    <IngredientSelect
                        ingredient={this.state.ingredient}
                        handleIngredientChange={this.handleIngredientChange}
                    />

                    {
                        this.state.meals ? (
                            <List>
                                {this.state.meals.map(meal => {
                                    return (
                                        <ListItem button key={meal}>
                                            <ListItemIcon onClick={this.handleMealDelete(meal)}><ClearIcon/></ListItemIcon>
                                            {mealsFixture.filter(v => v.id === meal)[0].name}
                                        </ListItem>
                                    )
                                })
                                }
                            </List>

                        ) : ('')
                    }

                    <FormControl fullWidth={true}>
                        <InputLabel shrink htmlFor="age-label-placeholder">
                            Posiłki
                        </InputLabel>
                        <Select
                            value={this.state.meal}
                            onChange={this.handleMealChange()}
                            input={<Input id="meal" />}
                        >
                            {mealsFixture.map(meal => {
                                return(<MenuItem key={meal.id} value={meal.id}>{meal.name}</MenuItem>)
                            })
                            }
                        </Select>
                    </FormControl>

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
                </Paper>
            </div>
        );

    }

}

export default withStyles(styles)(RecipeForm);

