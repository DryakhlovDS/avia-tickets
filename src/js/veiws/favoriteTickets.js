class FavoriteTicketsUI{
  constructor(){
    this.container = document.querySelector('#favorite-tickets');
  }
  
  addFavorite(icon){
    icon.classList.remove('favorite-border');
    icon.classList.add('favorite');
    icon.textContent = 'favorite';
  }
  
  removeFavorite(icon){
    icon.classList.add('favorite-border');
    icon.classList.remove('favorite');
    icon.textContent = 'favorite_border';
  }

  refreshFavoriteTickets(obj){
    //clear container
    this.container.innerHTML = '';
    const dropDownList = Object.values(obj);
    //Are list Empty?
    if (!dropDownList.length){
      this.container.insertAdjacentHTML('afterbegin', `<li class="favorite-tickets message_info"> У вас пока ещё нет favorit tickets</li>`);
      return;
    }

    this.renderTickets(dropDownList);
  }

  renderTickets(massive) {
    //can be method

  
      let frag = '';
      massive.forEach(tiket => {
        frag += this.renderOneTiket(tiket);
      });
      this.container.insertAdjacentHTML('afterbegin', frag);
  }

  renderOneTiket(obj) {
    return `<li class="favorite-tickets">
    <div class="card" data-ticket-id ="${obj.ticketId}">
    <div class="card-header d-flex">
      <span class="card-title">${obj.airlineName}</span>
      <div class="card__icons ml-auto">
        <i class="material-icons favorite">favorite</i>
      </div>
    </div>
    <div class="card-content">
      <div class="flight-info">
        <img class="" src="${obj.airlineLogo}">
        <span class="ml-auto">Номер рейса: ${obj.flight_number}</span>
      </div>
      <p>${obj.originName} -> ${obj.destinationName}</p>
      <p>Вылет : ${obj.departure_at}</p>
      <p>Возвращение : ${obj.return_at}</p>
      <p>Пересадок : ${obj.transfers}</p>
    </div>
    <div class="card-action d-flex">
      <div class="card__price">
        ${obj.currency}${obj.price}
      </div>
      <a href="#" class="btn waves-effect btn-apply ml-auto">
        Buy
        <i class="material-icons right">shopping_cart</i>
      </a>
    </div>
  </div>
  </li>`
  }
}

const favoriteTicketsUI = new FavoriteTicketsUI();
export default favoriteTicketsUI;