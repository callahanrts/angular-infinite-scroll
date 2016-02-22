(function(){
  var InfiniteScrollController = function($scope, $q, $timeout){
    this.elementHeight = 0;
    this.container = document.body; // default container to body
    this.loading = false;
    var vm = this;

    $scope.$on('$destroy', function(){
      unscroll();
    });

    var scrollTop = function(){
      return vm.container.scrollTop;
    };

    var scrollHeight = function(){
      return vm.container.scrollHeight;
    };

    var viewportHeight = function(){
      return Math.min(screen.height, Math.max(vm.container.clientHeight, screen.height));
    };

    var ableToScroll = function(){
      return vm.container.scrollHeight > viewportHeight();
    };

    var scrollPastPercentage = function(percentage){
      return scrollTop() + viewportHeight() > scrollHeight() - viewportHeight() * (percentage / 100);
    };

    var unscroll = function(){
      angular.element(vm.container == document.body ? window : vm.container).unbind('scroll')
    };

    this.loadOnScroll = function(el, dist){
      angular.element(vm.container == document.body ? window : vm.container).bind("scroll", function(){
        if(scrollPastPercentage(dist) && !vm.loading){
          vm.loadData(el);
        }
      });
    };

    this.loadData = function(el){
      vm.loading = true;
      $q.when($scope.loadMore(), function(){
        $timeout(function(){
          var height = el.clientHeight;
          // Load more data if the window is inable to scroll and there is more
          // data to load (height has changed)
          if(!ableToScroll(el) && height != vm.elementHeight){
            vm.elementHeight = height;
            vm.loadData(el);
          }
          vm.loading = false;
        }, 0)
      });
    };

  };

  InfiniteScrollController.$inject = ['$scope', '$q', '$timeout'];

  var infiniteScroll = function(){
    link = function(scope, el, attrs, ctrl){
      // Set Defaults
      var dist = parseInt(scope.scrollDistance);
      if(!angular.isNumber(dist) || isNaN(dist)){
        dist = 10;
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
