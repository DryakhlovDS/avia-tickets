class Favorite{
  constructor(){
    this.list = {};
  }

  removeFavorite(icon){
    const card = icon.closest('.card');
    const ticketId = card.dataset.ticketId;
    delete this.list[ticketId];
    return ticketId;
  }

}

let favorite = new Favorite();
export default favorite;