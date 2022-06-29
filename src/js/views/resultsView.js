import previewView from './previewView.js';
import View from './view.js';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _message = 'No recipes found for your query. Please try again!';
  _successMessage = '';

  _generateMarkup() {

    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
