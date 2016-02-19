//(function(){

  var infiniteScroll = function(){
    link = function(scope, element, attrs){
      console.log(this);
      console.log(arguments);
      //this.infiniteScroll();
    };

    var directive = {
      //scope: {
      ////  infiniteScroll: "&"
      //},
      //restrict: "E",
      link: link
    };

    return directive;
  };


  angular.module('infinite-scroll', [])
         .directive('infiniteScroll', infiniteScroll);
//})()
