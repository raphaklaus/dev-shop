var axios = require('axios');

module.exports = class GitHubAPI{
  static getOrganization(name){
    return axios.get(`https://api.github.com/orgs/${name}/members`);
  }

  static getProfileStatistics(user){
    return axios.get(`https://api.github.com/users/${user}`);
  }
};
