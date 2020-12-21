class TicketsUI {
  constructor() {
    this.container = document.querySelector('.tickets__inner');
    this.msg = document.querySelector('.message');
    this.msgInner = document.querySelector('.message__inner');

  }

  renderTickets(massive) {
    this.container.innerHTML = ''; //can be method

    if (!massive.length) {
      this.showMsgInfo('По вашему запросу билетов не найдено.');

      return;
    } else {
      this.hideMsgInfo();

      let frag = '';
      massive.forEach(tiket => {
        frag += this.renderOneTiket(tiket);
      });
      this.container.insertAdjacentHTML('afterbegin', frag);
    }
  }

  renderOneTiket(obj) {
    return `<div class="card" data-ticket-id ="${obj.ticketId}">
    <div class="card-header d-flex">
      <span class="card-title">${obj.airlineName}</span>
      <div class="card__icons ml-auto">
        <i class="material-icons favorite-border">favorite_border</i>
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
  </div>`
  }

  showMsgInfo(textInfo) {
    this.msg.classList.add('active');
    this.msgInner.classList.add('message_info');
    this.msgInner.textContent = textInfo; //'По вашему запросу билетов не найдено.';
  }

  showMsgError(text) {
    this.msg.classList.add('active');
    this.msgInner.classList.add('message_error');
    this.msgInner.textContent = text; //'По вашему запросу билетов не найдено.';
  }

  hideMsgError() {
    this.msg.classList.remove('active');
    this.msgInner.classList.remove('message_error');
    this.msgInner.innerHTML = '';
  }  

  hideMsgInfo() {
    this.msg.classList.remove('active');
    this.msgInner.classList.remove('message_info');
    this.msgInner.innerHTML = '';
  }
}

const ticketsUI = new TicketsUI();

export default ticketsUI;