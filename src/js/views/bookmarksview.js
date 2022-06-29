import View from './view.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _message = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _successMessage = '';

  addHandler(handler) {
    window.addEventListener('load', handler)
  }
  
  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }

}

export default new BookmarksView();
