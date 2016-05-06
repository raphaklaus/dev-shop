const axios = require('axios');

module.exports = class Checkout {
  constructor(){
    this.host = location.host;
  }

  get(){
    return axios.get(`https://api.${this.host}/checkout`);
  }

  save(cart){
    return axios.post(`https://api.${this.host}/checkout`, cart);
  }
};
