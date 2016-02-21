(function(){
  var InfiniteScrollController = function($scope, $q, $timeout){
    this.elementHeight = 0;
    var vm = this;

    this.loadOnScroll = function(el, dist){
      angular.element(window).bind("scroll", function(){
        if(scrollTop(el) + viewportHeight(el) > scrollHeight(el) - viewportHeight(el) * (dist / 100)){
          vm.loadData(el);
        }
      });
    };

    var scrollTop = function(el){
      return document.body.scrollTop;
    };

    var scrollHeight = function(el){
      return el.scrollHeight;
    };

    var viewportHeight = function(){
      return screen.height;
    };

    this.loadData = function(el){
      $q.when($scope.loadMore(), function(){
        $timeout(function(){
          var height = el.clientHeight;
          // Load more data if the window is inable to scroll and there is more
          // data to load (height has changed)
          if(window.innerHeight > height && height != vm.elementHeight){
            vm.elementHeight = height;
            vm.loadData(el);
          }
        }, 0)
      });
    };

  };

  InfiniteScrollController.$inject = ['$scope', '$q', '$timeout'];

  var infiniteScroll = function(){
    link = function(scope, el, attrs, ctrl){
      // Set Defaults
      if(!angular.isNumber(parseInt(scope.scrollDistance))){
        scope.scrollDistance = 10;
      }

      // Get Data
      ctrl.loadData(el[0]);
      ctrl.loadOnScroll(el[0], scope.scrollDistance);
    };

    return {
      scope: {
        loadMore: "&",
        scrollDistance: "="
      },
      controller: InfiniteScrollController,
      controllerAs: 'vm',
      restrict: "EA",
      link: link
    };
  };


  angular.module('infinite-scroll', [])
         .directive('infiniteScroll', infiniteScroll);
})()
