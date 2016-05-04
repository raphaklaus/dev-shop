var axios = require('axios');

module.exports = class GitHubAPI{
  static getOrganization(name){
    return axios.get(`https://api.github.com/orgs/${name}/members`);
  }

  static getUser(user){
    return axios.get(`https://api.github.com/users/${user}`);
  }

  static getUserStars(user){
    return new Promise((resolve, reject) => {
      axios.get(`https://api.github.com/users/${user}/starred`)
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
