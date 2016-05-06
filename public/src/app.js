const angular = require('angular'),
  Developers = require('./Developers'),
  Checkout = require('./Checkout');

var app = angular.module('dev-shop', [require('angular-route')]);

app.controller('DevelopersShopController',
  function($scope, $rootScope, $location) {
    var vm = this;
    vm.users = [];
    vm.cart = [];
    vm.total = 0;
    vm.coupon = {};
    vm.usersLoading = true;

    var calculateDiscount = () => {
      vm.total = (vm.total - vm.coupon.value < 0) ?
        0 : vm.total - vm.coupon.value;
    };

    var checkout = new Checkout();
    var developers = new Developers();
    developers.getMembersFromOrganization('fontwr')
      .then(() => developers.getStatistics())
      .then(() => developers.getStars())
      .then(() => {
        vm.usersLoading = false;
        developers.getPrice(developers.users);
        vm.users = developers.users;
        $scope.$apply();
      });

    vm.addToCart = (user) => {
      user.total = user.price;
      vm.total += user.total;
      user.hoursToWork = 1;

      if (vm.cart.length === 0 && vm.coupon.used)
        calculateDiscount();

      vm.cart.push(user);
      vm.users.splice(vm.users.indexOf(user), 1);
    };

    vm.removeFromCart = (user) => {
      vm.total -= user.total;
      vm.total = (vm.total < 0) ?
        0 : vm.total;

      vm.users.push(user);
      vm.cart.splice(vm.cart.indexOf(user), 1);
    };

    vm.calculateHours = (user) => {
      var previousTotal = user.total;
      user.total = user.price * (user.hoursToWork || 0);
      vm.total -= previousTotal;
      vm.total += user.total;
    };

    vm.useCoupon = () => {
      vm.coupon.value = 100;
      if (vm.coupon.code === 'SHIPIT'){
        calculateDiscount();
        vm.coupon.used = true;
      }
    };

    vm.checkout = () => {
      var cart = {
        discount: vm.coupon.value,
        items: vm.cart
      };

      checkout.save(cart)
        .then(function() {
          $location.path('/checkout');
          $rootScope.$apply();
        });
    };
  });

app.controller('CheckoutController', function($scope){
  var checkout = new Checkout();
  var vm = this;
  vm.cart = {};
  vm.total = 0;

  checkout.get().then((response) => {
    for (var user of response.data.items)
      vm.total += user.total;

    if (response.data.discount){
      vm.total -= response.data.discount;
      console.log(vm.total);
    }


    vm.cart = response.data;
    $scope.$apply();
  });
});

app.config(($routeProvider, $locationProvider) => {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html'
    })
    .when('/checkout', {
      templateUrl: 'templates/checkout.html'
    });
});
