# Angular Infinite Scrolling
[![Build Status](https://travis-ci.org/callahanrts/angular-infinite-scrolling.svg?branch=master)](https://travis-ci.org/callahanrts/angular-infinite-scrolling)

[Demos](http://codycallahan.com/angular-infinite-scrolling)

## Installation
[Bower](http://bower.io/) `bower install  angular-infinite-scrolling`

**or**

```javascript
<script src="./dist/infinite-scroll.min.js"></script>
```

## Getting Started
#### Directive Attributes
```bash
# Required - initialize infinite scrolling
infinite-scroll

# Required - a function to load more data
load-more

# Optional - Percentage of container height. load-more will be called
#            when scrolling is this distance from the bottom.
#            Default: 20
scroll-distance

# Optional - The id of the element that will be scrolling
#            Default: <body>
scroll-container
```

#### Example
```html
<body ng-app="myApp">
  <div id="container" ng-controller='MyController'>
    <div id="list"
         infinite-scroll
         load-more='load()'
         scroll-distance='20'
         scroll-container='container'>

      <div ng-repeat='item in items track by $index'>{{item}}</div>

    </div>
  </div>
</body>
```
```javascript
var myApp = angular.module('myApp', ['infinite-scroll']);

myApp.controller('MyController', function($scope) {
  $scope.items = [];
  $scope.container = "container";

  $scope.load = function() {
    var last = 0;
    var total = 1000;

    for(var i = 1; i <= 20; i++) {
      if($scope.items.length < total){
        $scope.items.push(last + i);
      }
    }

  };
});
```

## Promise Support
If a promise is returned from the `load-more` method, angular-infinite-scrolling will wait
until the promise returns to call the `load-more` method again.
```javascript
var myApp = angular.module('myApp', ['infinite-scroll']);

var MyController = function($scope, $q){
  $scope.items = [];
  $scope.container = "container";
  var last = 0;
  var total = 1000;

  $scope.load = function() {
    // Return a promise
    return $q(function(resolve, reject){
      setTimeout(function(){

        // Load items from memory or ajax request
        for(var i = 1; i <= 20; i++) {
          if($scope.items.length < total){
            $scope.items.push(last + i);

            // Resolve promise to continue infinite scrolling
            resolve();
          }
        }

      }, 500);
    });

  };

}
```

## Contributing
```bash
$ npm install
$ npm run init

# Make some changes

$ grunt test     # Make sure all tests are passing
$ npm run uglify # Create min file
```
