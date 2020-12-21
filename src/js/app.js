import './plugins';
import '../css/style.scss';
import '../css/helpers.scss';

import locations from './storage/locations';
import favorite from './storage/favorite';
import { indexElement } from './helpers/simpleFunctions';
import formUI from './veiws/form';
import navigationUI from './veiws/nav';
import ticketsUI from './veiws/tickets';
import favoriteTicketsUI from './veiws/favoriteTickets';

document.addEventListener('DOMContentLoaded', e => {

  initApp();

  formUI.form.addEventListener('submit', e => {
    e.preventDefault();
    onSubmit();
  })

  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('favorite-border')) {
      favoriteTicketsUI.addFavorite(e.target);
      addFavorite(e.target);
      favoriteTicketsUI.refreshFavoriteTickets(favorite.list);
      return;
    }

    if (e.target.classList.contains('favorite')) {
      let cardId = favorite.removeFavorite(e.target);
      favoriteTicketsUI.refreshFavoriteTickets(favorite.list);
      let icon = document.querySelector(`[data-ticket-id = "${cardId}"] .favorite`);
      favoriteTicketsUI.removeFavorite(icon);// на карточке в основном поле
      
      return;
    }

  });

  async function initApp() {
    await locations.init();
    formUI.setAutoComplete(locations.cityWithCountry);
  }

  async function onSubmit() {
    if (!formUI.inputDepartValue || !formUI.inputArrivetValue || !formUI.dateArriveValue || !formUI.dateDepartValue){
      ticketsUI.showMsgError('Заполните все поля формы!');
      return;
    }
    else{
      ticketsUI.hideMsgError();
    }
    const departValue = locations.getCityCodeByKey(formUI.inputDepartValue) ;
    const arriveValue = locations.getCityCodeByKey(formUI.inputArrivetValue) ;
    const dateArrive = formUI.dateArriveValue;
    const dateDepart = formUI.dateDepartValue;
    const currency = navigationUI.currencyValue;

    await locations.fetchTickets({
      origin: departValue,
      destination: arriveValue,
      depart_date: dateDepart,
      return_date: dateArrive,
      currency
    });

    const symbol = navigationUI.getCurrencySymbol(currency);
    locations.lastSearch.forEach( obj => {
      Object.assign(obj , {currency: symbol});
    });
   
    ticketsUI.renderTickets(locations.lastSearch);

  }

  function addFavorite(target) {
    let card = target.closest('.card');
    const ticketId = card.dataset.ticketId;
    const num = indexElement(card);

    Object.assign(favorite.list, {
      [ticketId]: locations.lastSearch[num]
    });

  }

})