class Spinner {
  handleClear() {
    spinner.innerHTML = '';
  }

  render() {
    const html = `
      <div class="spinner-container">
        <img class="spinner__img" src="../img/spinner.svg" />
      </div>
    `;
    spinner.innerHTML = html;
  }
}
const spinnerPage = new Spinner();
