'use strict';

module.exports = class MainTasks {
  static addToCart(){
    element(by.css('.developers-available')).element(by.tagName('article'))
      .element(by.tagName('button')).click();

    return this;
  }

  static removeFromCart(){
    element(by.css('.developers-in-cart')).element(by.tagName('article'))
      .element(by.tagName('button')).click();

    return this;
  }

  static useCoupon(){
    element(by.css('.coupon')).element(by.tagName('article'))
      .element(by.tagName('input')).sendKeys('SHIPIT');
    element(by.css('.coupon')).element(by.tagName('article'))
      .element(by.tagName('button')).click();

    return this;
  }

  static checkCartAmount(number){
    expect(element.all(by.repeater('user in developersShop.cart'))
      .count()).toEqual(number);

    return this;
  }

  static checkTotalValue(value){
    expect(element(by.binding('developersShop.total')).getText())
      .toEqual(value);

    return this;
  }
};
