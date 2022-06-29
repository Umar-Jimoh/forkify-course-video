class SearchView {
  #parentEl = document.querySelector('.search');

  geQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#parentEl.querySelector('.search__field').value = ''
    return query
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler()
    });
  }
}

export default new SearchView()