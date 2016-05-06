const axios = require('axios');

module.exports = class GitHubAPI{
  constructor(){
    var token;

    try {
      token = require('./APIToken');
    } catch (error){
      token = null;
    }

    this.tokenParameter = (token) ? '?access_token=' + token : '';
  }

  getOrganization(name){
    return axios
      .get(`https://api.github.com/orgs/${name}/members${this.tokenParameter}`);
  }

  getUser(user){
    return axios
      .get(`https://api.github.com/users/${user}${this.tokenParameter}`);
  }

  getUserStars(user){
    return new Promise((resolve, reject) => {
      axios.get(`https://api.github.com/users/` +
        `${user}/starred${this.tokenParameter}`)
        .then((response) => {
          var object = {
            'login': user
          };

          object.data = response.data;
          resolve(object);
        }).catch((error) => {
          reject(error);
        });
    });
  }
};
