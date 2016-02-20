(function(){

  var infiniteScroll = function(){
    link = function(scope, element, attrs){
      console.log(arguments);
      console.log(attrs.infiniteScroll);
      scope.infiniteScroll()
      //attrs.infiniteScroll(5);
    };

    return {
      scope: {
        infiniteScroll: "&"
      },
      //restrict: "E",
      link: link
    };
  };


  angular.module('infinite-scroll', [])
         .directive('infiniteScroll', infiniteScroll);
})()
