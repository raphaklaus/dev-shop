var gitHubAPI = require('./GitHubAPI');
var _ = require('underscore');

module.exports = class Developers {
  constructor(){
    this.gitHubAPI = new gitHubAPI();
    this.members = [];
    this.users = [];
  }

  getMembersFromOrganization(organization){
    return this.gitHubAPI.getOrganization(organization).then((response) => {
      for (var members of response.data)
        this.members.push(members);
    });
  }

  getStatistics(){
    var promises = [];
    for (var member of this.members)
      promises.push(this.gitHubAPI.getUser(member.login));

    return Promise.all(promises).then((response) => {
      for (let user of response) {
        let model = {};
        user = user.data;
        model.name = user.name;
        model.login = user.login;
        model.avatarUrl = user.avatar_url;
        model.followers = user.followers;
        model.publicRepos = user.public_repos;
        this.users.push(model);
      }
    });
  }

  getStars(){
    var promises = [];
    for (var member of this.members)
      promises.push(this.gitHubAPI.getUserStars(member.login));

    return Promise.all(promises).then((response) => {
      for (var stars of response) {
        let user = _.find(this.users, {login: stars.login});
        let index = this.users.indexOf(user);
        this.users[index].stars = stars.data.length;
      }
    });
  }

  getPrice(){
    for (var user of this.users) {
      user.price = this.calculatePrice(user);
    }
  }

  calculatePrice(user){
    return user.followers * 100 + user.stars * 10 + user.publicRepos * 100;
  }
};
