var gitHubAPI = require('./GitHubAPI');
var _ = require('underscore');

module.exports = class Developers {
  constructor(){
    this.members = [];
    this.users = [];
  }

  getMembersFromOrganization(organization){
    return gitHubAPI.getOrganization(organization).then((response) => {
      for (var members of response.data)
        this.members.push(members);
    });
  }

  getStatistics(){
    var promises = [];
    console.log(this.members);
    for (var member of this.members){
      promises.push(gitHubAPI.getUser(member.login));
      // promises.push(gitHubAPI.getUserStars(member.login));
      console.log(member.login);
    }

    return Promise.all(promises).then((response) => {
      for (var user of response) {
        let model = {};
        model.name = user.name;
        model.avatar_url = user.avatar_url;
        model.followers = user.followers;
        model.public_repos = user.public_repos;
        this.users.push(model);
      }
    });
  }

  getStars(){
    var promises = [];
    for (var member of this.members)
      promises.push(gitHubAPI.getUserStars(member.login));

    return Promise.all(promises).then((response) => {
      for (var stars of response) {
        let user = _.where(this.users, {name: stars.login});
        user.stars = stars.data.length;
      }
    });

  }
};
