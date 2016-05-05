const angular = require('angular'),
  Developers = require('./Developers'),
  Checkout = require('./Checkout');

var app = angular.module('dev-shop', [require('angular-route')]);

app.controller('DevelopersPanel', function($scope, $location) {
  var developersPanel = this;
  developersPanel.users = [];
  developersPanel.cart = [];
  developersPanel.total = 0;
  developersPanel.coupon = {};
  developersPanel.usersLoading = true;

  var calculateDiscount = () => {
    developersPanel.total = (developersPanel.total - developersPanel.coupon.value < 0) ?
      0 : developersPanel.total - developersPanel.coupon.value;
  };

  var checkout = new Checkout();
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

    if (developersPanel.cart.length === 0 && developersPanel.coupon.used)
      calculateDiscount();

    developersPanel.cart.push(user);
    developersPanel.users.splice(developersPanel.users.indexOf(user), 1);
  };

  developersPanel.removeFromCart = (user) => {
    developersPanel.total -= user.total;
    developersPanel.total = (developersPanel.total < 0) ?
      0 : developersPanel.total;

    developersPanel.users.push(user);
    developersPanel.cart.splice(developersPanel.cart.indexOf(user), 1);
  };

  developersPanel.calculateHours = (user) => {
    var previousTotal = user.total;
    user.total = user.price * (user.hoursToWork || 0);
    developersPanel.total -= previousTotal;
    developersPanel.total += user.total;
  };

  developersPanel.useCoupon = () => {
    developersPanel.coupon.value = 100;
    if (developersPanel.coupon.code === 'SHIPIT'){
      calculateDiscount();
      developersPanel.coupon.used = true;
    }
  };

  developersPanel.checkout = () => {
    var cart = {
      discount: developersPanel.coupon.value,
      items: developersPanel.cart
    };

    checkout.save(cart)
      .then($location.path('/checkout'));
  };
});

app.controller('CheckoutController', function(){
  var checkout = new Checkout();
  var checkOutController = this;
  checkOutController.cart = [];

  checkout.get().then((response) => {
    checkOutController.cart = response;
  });
});

app.config(($routeProvider, $locationProvider) => {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
      controller: 'DevelopersPanel'
    })
    .when('/checkout', {
      templateUrl: 'templates/checkout.html',
      controller: 'CheckoutController'
    });
});
