const axios = require('axios');

module.exports = class Checkout {
  get(){
    return axios.get(`/api/checkout`);
  }

  save(cart){
    return axios.post(`/api/checkout`, cart);
  }
};
