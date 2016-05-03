var gitHubAPI = require('./GitHubAPI.js');

module.exports = class Developers {
  get(){
    this.members = [];
    gitHubAPI.getOrganization('fontwr').then((response) => {
      for (var members of response.data)
        this.members.push(members);
    });
  }
};
