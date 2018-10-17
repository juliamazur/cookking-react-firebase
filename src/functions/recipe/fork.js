
// TODO error handling
// TODO atm its edit not fork
export default (recipeList, id) => {
    return {
        pickedRecipeId: id,
        pickedRecipe: recipeList[id],
        edit: false,
        fork: true,
    };
};
