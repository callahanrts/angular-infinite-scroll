// ///////////////////////////////////////////
// Window.js

describe('when the scroll container is the window', function() {
  var load = function(options){
    options = options || {}
    var href = "test/templates/window.html?count="+options.count;
    if(options.total > 0){ href += "&total="+options.total; }
    if(options.scroll > 0){ href += "&dist="+options.scroll; }
    browser.get(href);
  };

  var lengthIs = function(length){
    element.all(by.css("ul li")).then(function(items){
      expect(items.length).toBe(length);
    });
  };

  var canScroll = function(){
    var list = element(by.id('list'));
    browser.executeScript('return window.innerHeight;').then(function(winHeight){
      list.getSize().then(function(size){
        expect(size.height > winHeight).toBe(true);
      });
    });
  };

  var scrollDown = function(percentage){
    // Scroll percentage defaults to 10%
    percentage = percentage || 10;
    var scrollPos = "1 + document.body.scrollHeight - screen.height * (1 + "+percentage+" / 100)"
    browser.executeScript("window.scrollTo(0, " + scrollPos + ")")
  };

  describe('when testing', function(){
    it('should limit by total', function(){
      load({ count: 100, total: 10 });
      lengthIs(10);
    });
  });

  it('should load data initially', function() {
    load({ count: 10, total: 10 });
    lengthIs(10);
  });

  it('should load more items until the page can scroll', function(){
    load({ count: 10 });
    canScroll();
  });

  describe('when there are no more items to load', function(){
    describe('when there are enough items to scroll', function(){
      it('should stop loading items', function(){
      });
    });

    describe('when there are not enough items to scroll', function(){
      it('should stop loading items', function(){
        load(10, 12);
        load({ count: 10, total: 12 });
        lengthIs(12);
      });
    });
  });

  describe('when the scroll event is triggered', function(){
    it('should load more data', function(){
      load({ count: 100, total: 1000, scroll: 10 });
      scrollDown(11);
      lengthIs(100);
      scrollDown(10);
      lengthIs(200);
    });

    describe('when the scroll distance is 50%', function(){
      it('should load moare data', function(){
        load({ count: 100, total: 1000, scroll: 50 });
        scrollDown(55);
        lengthIs(100);
        scrollDown(50);
        lengthIs(200);
      });
    });
  });

});
