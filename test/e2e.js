var MainTasks = require('./tasks/MainTasks.js');

describe('Dev Shop', () => {
  var EC = protractor.ExpectedConditions;

  beforeEach(() => {
    browser.get('http://localhost');
  });

  it('should add devs, remove one, and apply coupon', () => {
    browser.wait(EC.visibilityOf($('.developers')), 5000).then(() => {
      MainTasks.addToCart()
        .checkCartAmount(1)
        .addToCart()
        .checkCartAmount(2)
        .removeFromCart()
        .checkCartAmount(1)
        .useCoupon()
        .checkTotalValue('$9,200.00');
    });
  });

  it('should add devs, and apply coupon', () => {
    browser.wait(EC.visibilityOf($('.developers')), 5000).then(() => {
      MainTasks.addToCart()
        .checkCartAmount(1)
        .addToCart()
        .checkCartAmount(2)
        .useCoupon()
        .checkTotalValue('$10,540.00');
    });
  });

  it('should add devs', () => {
    browser.wait(EC.visibilityOf($('.developers')), 5000).then(() => {
      MainTasks.addToCart()
        .checkCartAmount(1)
        .addToCart()
        .checkCartAmount(2)
        .checkTotalValue('$10,640.00');
    });
  });

  it('should add devs, remove one, and apply coupon', () => {
    browser.wait(EC.visibilityOf($('.developers')), 5000).then(() => {
      MainTasks.addToCart()
        .checkCartAmount(1)
        .addToCart()
        .checkCartAmount(2)
        .removeFromCart()
        .useCoupon()
        .checkTotalValue('$9,200.00');
    });
  });

  it('should add devs and remove them', () => {
    browser.wait(EC.visibilityOf($('.developers')), 5000).then(() => {
      MainTasks.addToCart()
        .checkCartAmount(1)
        .addToCart()
        .checkCartAmount(2)
        .removeFromCart()
        .removeFromCart()
        .checkCartAmount(0)
        .checkTotalValue('$0.00');
    });
  });

  it('should not add devs', () => {
    browser.wait(EC.visibilityOf($('.developers')), 5000).then(() => {
      MainTasks.checkCartAmount(0)
        .checkTotalValue('$0.00');
    });
  });
});
