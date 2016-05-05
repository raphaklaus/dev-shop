const angular = require('angular'),
  Developers = require('./Developers');

var app = angular.module('dev-shop', []);

app.controller('DevelopersPanel', function($scope) {
  var developersPanel = this;
  developersPanel.users = [];
  developersPanel.cart = [];
  developersPanel.total = 0;
  developersPanel.usersLoading = true;
  var developers = new Developers();
  developers.getMembersFromOrganization('fontwr')
    .then(() => developers.getStatistics())
    .then(() => developers.getStars())
    .then(() => {
      developersPanel.usersLoading = false;
      developers.getPrice(developers.users);
      developersPanel.users = developers.users;
      $scope.$apply();
    });

  developersPanel.addToCart = (user) => {
    user.total = user.price;
    developersPanel.total += user.total;
    user.hoursToWork = 1;
    developersPanel.cart.push(user);
    developersPanel.users.splice(developersPanel.users.indexOf(user), 1);
  };

  developersPanel.removeFromCart = (user) => {
    developersPanel.total -= user.total;
    developersPanel.users.push(user);
    developersPanel.cart.splice(developersPanel.cart.indexOf(user), 1);
  };

  developersPanel.calculateHours = (user) => {
    var previousTotal = user.total;
    user.total = user.price * (user.hoursToWork || 0);
    developersPanel.total -= previousTotal;
    developersPanel.total += user.total;
    console.log(user.hoursToWork);
  };
});
