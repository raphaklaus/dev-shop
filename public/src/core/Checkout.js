const axios = require('axios');

module.exports = class Checkout {
  get(){
    return axios.get(`http://api.${host}/checkout`);
  }

  save(cart){
    var host = location.host;
    return axios.post(`http://api.${host}/checkout`, cart);
  }
};
