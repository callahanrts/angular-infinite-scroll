(function(){
  var InfiniteScrollController = function($scope, $q, $timeout){
    this.elementHeight = 0;
    this.container = window; // default container to window
    var vm = this;

    this.loadOnScroll = function(el, dist){
      console.log(vm.container, el, dist)
      angular.element(vm.container).bind("scroll", function(){
        if(scrollTop() + viewportHeight(el) > scrollHeight(el) - viewportHeight(el) * (dist / 100)){
          vm.loadData(el);
        }
      });
    };

    var scrollTop = function(){
      return vm.container == window ? document.body.scrollTop : vm.container.scrollTop;
    };

    var scrollHeight = function(el){
      return el.scrollHeight;
    };

    var viewportHeight = function(){
      return vm.container == window ? screen.height : vm.container.clientHeight;
    };

    var ableToScroll = function(el){
      var scrollHeight = (vm.container == window ? window.innerHeight : vm.container.scrollHeight)
      return scrollHeight <= el.clientHeight;
    };

    this.loadData = function(el){
      $q.when($scope.loadMore(), function(){
        $timeout(function(){
          var height = el.clientHeight;
          // Load more data if the window is inable to scroll and there is more
          // data to load (height has changed)
          if(!ableToScroll(el) && height != vm.elementHeight){
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
      dist = parseInt(scope.scrollDistance);
      if(!angular.isNumber(dist)){
        scope.scrollDistance = 10;
      }

      // Get Data
      if(angular.isString(scope.scrollContainer)){
        ctrl.container = document.getElementById(scope.scrollContainer);
      }
      ctrl.loadData(el[0]);
      ctrl.loadOnScroll(el[0], dist);
    };

    return {
      scope: {
        loadMore: "&",
        scrollDistance: "=",
        scrollContainer: "="
      },
      controller: InfiniteScrollController,
      controllerAs: 'vm',
      restrict: "AEC",
      link: link
    };
  };


  angular.module('infinite-scroll', [])
         .directive('infiniteScroll', infiniteScroll);
})()
