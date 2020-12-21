import api from '../services/apiService';
import forDate from '../helpers/transformDate';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.cityWithCountry = {};
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines()
    ]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountry(countries);
    this.cities = this.serializeCity(cities);
    this.cityWithCountry = this.creatShortList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    this.lastSearch = [];

    return response;
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(item => item.fullName === key);
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : '';
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : ''; //`http://pics.avs.io/200/200/${code}.png`;
  }

  serializeCountry(countries) {
    // { country code: {...} } 
    return countries.reduce((acc, item) => {
      acc[item.code] = item;
      return acc;
    }, {});
  }

  serializeCity(cities) {
    //{City code : {...} }
    return cities.reduce((acc, item) => {
      const countryName = this.countries[item.country_code].name;
      item.name = item.name || item.name_translations.en;
      const fullName = `${item.name}, ${countryName}`;
      acc[item.code] = {
        ...item,
        countryName,
        fullName,
      };
      return acc;
    }, {})
  }

  serializeAirlines(airlines) {
    //{ airline code: {...} }
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/300/100/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  serializeTickets(obj) {
    return Object.values(obj).map(ticket => {
      return {
        ...ticket,
        originName: this.getCityNameByCode(ticket.origin),
        destinationName: this.getCityNameByCode(ticket.destination),
        airlineName: this.getAirlineNameByCode(ticket.airline),
        airlineLogo: this.getAirlineLogoByCode(ticket.airline),
        departure_at: forDate.transformDate(ticket.departure_at),   // 2020-12-21T08:40:00Z
        return_at: forDate.transformDate(ticket.return_at),
        ticketId: ticket.airline + Math.floor(Math.random()*1000000),
      }
    });
  }

  creatShortList(objCities) {
    // {City, Country : null}
    const shortList = Object.values(objCities).map(item => item.fullName);
    const objectShortlist = shortList.reduce((obj, fullName) => {
      obj[fullName] = null;
      return obj;
    }, {});
    return objectShortlist;
  }

  async fetchTickets(params) {
    const res = await this.api.tickets(params);
    this.lastSearch = this.serializeTickets(res.data);
    return res.data;
  }

  
}

const locations = new Locations(api);

export default locations;