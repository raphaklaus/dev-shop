const angular = require('angular'),
  Developers = require('./Developers');

var app = angular.module('dev-shop', []);

app.controller('Main', ($scope) => {
  var developers = new Developers();
  developers.getMembersFromOrganization('fontwr')
    .then(() => developers.getStatistics())
    .then(() => developers.getStars())
    .then(() => {
      console.log('finally: ' + JSON.stringify(developers.users));
      $scope.users = developers.users;
    });
});
