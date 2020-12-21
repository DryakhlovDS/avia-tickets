class Favorite{
  constructor(){
    this.list = {};
  }

  addFavoriteUI(icon){
    icon.classList.remove('favorite-border');
    icon.classList.add('favorite');
    icon.textContent = 'favorite';
  }
  
  removeFavoriteUI(icon){
    icon.classList.add('favorite-border');
    icon.classList.remove('favorite');
    icon.textContent = 'favorite_border';
  }

  removeFavorite(icon){
    let card = icon.closest('.card');
    const ticketId = card.dataset.ticketId;
    delete this.list[ticketId];
  }
}

let favorite = new Favorite();
export default favorite;