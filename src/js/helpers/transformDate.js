class ForDate {
  constructor() {
    this.dictionary = [ , 'Янв', 'Фев', 'Мар',  'Апр',  'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя',  'Дек'];
    }


  transformDate(string) {
    let oldDate = string.split('-');
    oldDate[3] = oldDate[2].slice(3, 8);
    oldDate[2] = oldDate[2].slice(0, 2);
    oldDate[1] = this.dictionary[Number(oldDate[1])];
    let newDate = [];
    for (let i = 2; i >= 0; i--) {
      newDate.push(oldDate[i]);
    }
    newDate.push(oldDate[3]);
    newDate = newDate.join(' ');
    return newDate;
  }
}

const forDate = new ForDate();

export default forDate;