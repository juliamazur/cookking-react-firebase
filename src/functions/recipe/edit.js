
// TODO error handling
export default (recipeList, id) => {
    return {
        pickedRecipeId: id,
        pickedRecipe: recipeList[id],
        edit: true,
        fork: false,
    };
};
