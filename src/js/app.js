import './plugins';
import '../css/style.scss';
import '../css/helpers.scss';

import locations from './storage/locations';
import favorite from './storage/favorite';
import formUI from './veiws/form';
import navigationUI from './veiws/nav';
import ticketsUI from './veiws/tickets';

document.addEventListener('DOMContentLoaded', e => {

  initApp();

  formUI.form.addEventListener('submit', e => {
    e.preventDefault();
    onSubmit();
  })

  ticketsUI.container.addEventListener('click', e => {
    if (e.target.classList.contains('favorite-border')) {
      favorite.addFavoriteUI(e.target);
      addFavorite(e.target);
      return;
    }

    if (e.target.classList.contains('favorite')) {
      favorite.removeFavoriteUI(e.target);
      favorite.removeFavorite(e.target);
      return;
    }

  });

  async function initApp() {
    await locations.init();
    formUI.setAutoComplete(locations.cityWithCountry);
  }

  async function onSubmit() {
    const departValue = 'MOW'; //locations.getCityCodeByKey(formUI.inputDepartValue) ;
    const arriveValue = 'KZN'; //locations.getCityCodeByKey(formUI.inputArrivetValue) ;
    const dateArrive = formUI.dateArriveValue || '2020-12';
    const dateDepart = formUI.dateDepartValue || '2020-12';
    const currency = navigationUI.currencyValue;

    await locations.fetchTickets({
      origin: departValue,
      destination: arriveValue,
      depart_date: dateDepart,
      return_date: dateArrive,
      currency
    });

    const symbol = navigationUI.getCurrencySymbol(currency);
    ticketsUI.renderTickets(locations.lastSearch, symbol);

  }

  function addFavorite(target) {
    let card = target.closest('.card');
    const ticketId = card.dataset.ticketId;
    let num = 0;

    while (!!card.previousSibling) {
      num++;
      card = card.previousSibling;
    }

    Object.assign(favorite.list, {
      [ticketId]: locations.lastSearch[num]
    });
  }

})