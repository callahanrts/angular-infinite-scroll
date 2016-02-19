
//var fs = require('fs');
//
//var requireInfiniteScroll = function(){
//  browser.executeScript("window.onload = function(){"+
//    fs.readFileSync("dist/infinite-scroll.js").toString()+
//  "}")
//};
//
//requireInfiniteScroll();


var createApp = function(){
  var MyController = function(){
    this.items = [];
    this.name = "test";
    var ctrl = this;
    this.load = function(count){
      count = count || 3;
      [].push.apply(ctrl.items, new Array(count));
    };
  };

  angular.module('myApp')
         .controller("MyController", MyController);
};


// spec.js
describe('InfiniteScroll', function() {
  beforeEach(function(){
    browser.get("test/templates/window.html");
    browser.executeScript(createApp);
  });

  it('should load MyController', function(){
    element.all(by.css("#name")).then(function(el){
      expect(el[0].getText()).toBe("test");
    });
  });

  it('should load data initially', function() {
    element.all(by.css("ul li")).then(function(items){
      console.log(items)
      expect(items.length).toBe(10);
    });
    expect(browser.getTitle()).toEqual('Super Calculator');
  });
});
