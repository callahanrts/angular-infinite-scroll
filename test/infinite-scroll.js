
//var fs = require('fs');
//
//var requireInfiniteScroll = function(){
//  browser.executeScript("window.onload = function(){"+
//    fs.readFileSync("dist/infinite-scroll.js").toString()+
//  "}")
//};
//
//requireInfiniteScroll();


//var createApp = function(){
//  var myApp = angular.module('myApp', ['infinite-scroll']);
//
//  myApp.controller('MyController', function($scope) {
//    $scope.images = [];
//
//    $scope.load = function(count) {
//      console.log('loadmore')
//      var last = $scope.images[$scope.images.length - 1];
//      for(var i = 1; i <= count; i++) {
//        $scope.images.push((last || 0) + i);
//      }
//    };
//  });
//
//};


// spec.js
describe('InfiniteScroll', function() {
  beforeEach(function(){
    browser.get("test/templates/window.html");
    //browser.executeScript(createApp);
  });

  //it('should load MyController', function(){
  //  element.all(by.css("#name")).then(function(el){
  //    expect(el[0].getText()).toBe("test");
  //  });
  //});

  it('should load data initially', function() {
    element.all(by.css("ul li")).then(function(items){
      expect(items.length).toBe(10);
    });
    expect(browser.getTitle()).toEqual('Super Calculator');
  });
});
