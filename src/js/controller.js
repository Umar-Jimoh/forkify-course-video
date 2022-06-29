import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksview from './views/bookmarksview.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // update results viwe to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // Update bookmark
    bookmarksview.update(model.state.bookmarks);

    // loading recipe
    await model.loadRecipe(id);

    // rendering recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
      console.error(err);

  }
};

const controlSearchResults = async function () {
  try {
    
    //  Get search query
    const query = searchView.geQuery();
    if (!query) return;
    
    // Render result spinner
    resultsView.renderSpinner();

    //  Load search query
    await model.loadSearchResult(query);

    // Render Results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // Render Pagination
    paginationView.render(model.state.search)
    
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(goTo) {
  // Render new Results
  resultsView.render(model.getSearchResultsPage(goTo));

  // Render new Pagination
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  // uodate the rcipes servings (in state)
  model.updateServings(newServings)

  // update the recipes view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function() {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else{
      model.deleteBookmark(model.state.recipe.id);
    }
  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmark
  bookmarksview.render(model.state.bookmarks)
}

const controlBookmarks = function() {
  bookmarksview.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe) {
  try{
    // Show render spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // c recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderSuccessMessage();

    // Render bookmark view
    bookmarksview.render(model.state.bookmarks);

    // Change ID in Url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch(err) {
    console.error('⛔', err);
    addRecipeView.renderError(err.message);
  }
}

const init = function() {
  bookmarksview.addHandler(controlBookmarks)
  recipeView.addHandlerRender(controlRecipies);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)

  console.log('Welcome');
}

init()


