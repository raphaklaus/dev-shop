describe('Dev Shop', () => {
  beforeEach(() => {
    browser.get('http://localhost');
  });
  
  it('should add devs, remove them, and apply coupon', () => {
    var developersInCart, EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf($('.developers')), 5000).then(() => {
      element(by.css('.developers-available')).element(by.tagName('article'))
        .element(by.tagName('button')).click();

      developersInCart = element.all(by.repeater('user in developersShop.cart'));
      expect(developersInCart.count()).toEqual(1);

      element(by.css('.developers-available')).element(by.tagName('article'))
        .element(by.tagName('button')).click();

      developersInCart = element.all(by.repeater('user in developersShop.cart'));
      expect(developersInCart.count()).toEqual(2);
    });
  });
});

// describe('angularjs homepage todo list', function() {
//   it('should add a todo', function() {
//     browser.get('https://angularjs.org');
//
//     element(by.model('todoList.todoText')).sendKeys('write first protractor test');
//     element(by.css('[value="add"]')).click();
//
//     var todoList = element.all(by.repeater('todo in todoList.todos'));
//     expect(todoList.count()).toEqual(3);
//     expect(todoList.get(2).getText()).toEqual('write first protractor test');
//
//     // You wrote your first test, cross it off the list
//     todoList.get(2).element(by.css('input')).click();
//     var completedAmount = element.all(by.css('.done-true'));
//     expect(completedAmount.count()).toEqual(2);
//   });
// });
