
var load = function(options){
  options = options || {}
  var href = "test/templates/"+options.container+".html?count="+options.count;
  if(options.total > 0){ href += "&total="+options.total; }
  if(options.scroll > 0){ href += "&dist="+options.scroll; }
  browser.get(href);
};

var lengthIs = function(length){
  element.all(by.css("#list > *")).then(function(items){
    expect(items.length).toBe(length);
  });
};

var containerCanScroll = function(){
  var container = element(by.id('container'));
  container.getAttribute('height').then(function (height) {
      expect(container.getAttribute('scrollHeight')).toBeGreaterThan(height);
  });
};

var windowCanScroll = function(){
  var list = element(by.id('list'));
  browser.executeScript('return window.innerHeight;').then(function(winHeight){
    list.getSize().then(function(size){
      expect(size.height > winHeight).toBe(true);
    });
  });
};

var scrollBody = function(percentage){
  // Scroll percentage defaults to 10%
  percentage = percentage || 10;

  var script = function(percentage){
    setTimeout(function(){
      var scrollPos = 1 + document.body.scrollHeight - screen.height * (1 + percentage / 100);
      window.scrollTo(0, scrollPos);
    }, 0)
  }
  return browser.executeScript(script, percentage);
};

var scrollContainer = function(percentage){
  var percentage = percentage || 10;

  var script = function(percentage){
    setTimeout(function(){
      var container = document.getElementById('container');
      var scrollPos = 1 + container.scrollHeight - container.clientHeight * (1 + percentage / 100);
      container.scrollTop = scrollPos;
    }, 0)
  };
  return browser.executeScript(script, percentage);
};

describe('#InfiniteScroll', function(){

  describe('when testing', function(){
    it('should limit by total', function(){
      load({ container: "window", count: 100, total: 10 });
      lengthIs(10);
    });
  });

  describe('when the scroll container is specified in the directive\n', function() {
    afterEach(function(){
      browser.executeScript("document.getElementById('container').scrollTop = 0");
    });

    it('should load data initially', function() {
      load({ container: "container", count: 10, total: 10 });
      lengthIs(10);
    });

    it('should load more items until the page can scroll', function(){
      load({ container: "container", count: 10 });
      containerCanScroll();
    });

    describe('when there are no more items to load\n', function(){
      describe('when there are enough items to scroll\n', function(){
        it('should stop loading items', function(){
          load({ container: "container", count: 100, total: 200, scroll: 10 });
          scrollContainer(10).then(function(){
            lengthIs(200);
          });
        });
      });

      describe('when there are not enough items to scroll\n', function(){
        it('should stop loading items', function(){
          load({ container: "container", count: 5, total: 12 });
          lengthIs(12);
        });
      });

    });

    describe('when the scroll event is triggered\n', function(){
      it('should load more data', function(){
        load({ container: "container", count: 100, total: 1000, scroll: 10 });
        scrollContainer(10).then(function(){
          lengthIs(200);
        });
      });

      describe('when the scroll distance is 50%\n', function(){
        it('should load moare data', function(){
          load({ container: "container", count: 100, total: 1000, scroll: 50 });
          scrollContainer(50).then(function(){
            lengthIs(200);
          });
        });
      });
    });

  });

  describe('when the scroll container is the window\n', function() {
    afterEach(function(){
      browser.executeScript("window.scrollTo(0,0)");
    });

    it('should load data initially', function() {
      load({ container: "window", count: 10, total: 10 });
      lengthIs(10);
    });

    it('should load more items until the page can scroll', function(){
      load({ container: "window", count: 10 });
      windowCanScroll();
    });

    describe('when there are no more items to load\n', function(){
      describe('when there are enough items to scroll\n', function(){
        it('should stop loading items', function(){
          load({ container: "window", count: 100, total: 200, scroll: 10 });
          scrollBody(10, function(){
            lengthIs(200);
          });
        });
      });

      describe('when there are not enough items to scroll\n', function(){
        it('should stop loading items', function(){
          load({ container: "window", count: 10, total: 12 });
          lengthIs(12);
        });
      });
    });

    describe('when the scroll event is triggered\n', function(){
      it('should load more data', function(){
        load({ container: "window", count: 100, total: 1000, scroll: 10 });
        scrollBody(10).then(function(){
          lengthIs(200);
        });
      });

      describe('when the scroll distance is 50%\n', function(){
        it('should load moare data', function(){
          load({ container: "window", count: 100, total: 1000, scroll: 50 });
          scrollBody(50).then(function(){
            lengthIs(200);
          });
        });
      });
    });

  });
});
