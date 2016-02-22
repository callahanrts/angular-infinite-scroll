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
# Required - initialize infinite scrolling with a function to load more data
infinite-scroll

# Optional - Percentage of container height. infinite-scroll will be called
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
         infinite-scroll='load()'
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
  $scope.distance = 80;
  $scope.container = 'container';
  $scope.total = 200;
  $scope.count = 20;

  $scope.load = function() {
    var last = $scope.items[$scope.items.length - 1];
    for(var i = 1; i <= $scope.count; i++) {
      if($scope.items.length < $scope.total){
        $scope.items.push((last || 0) + i);
      }
    }
  };
```

## Promise Support
If a promise is returned from the `infinite-scroll` method, angular-infinite-scrolling will wait
until the promise returns to call the `infinite-scroll` method again.
```javascript
var myApp = angular.module('myApp', ['infinite-scroll']);

var MyController = function($scope, $q) {
  $scope.items = [];
  $scope.distance = 80;
  $scope.container = 'container';
  $scope.total = 200;
  $scope.count = 20
  $scope.delay = 500;

  $scope.load = function() {
    // Return a promise
    return $q(function(resolve, reject){
      setTimeout(function(){
        var last = $scope.items[$scope.items.length - 1];

        // Load items from memory or ajax request
        for(var i = 1; i <= $scope.count; i++) {
          if($scope.items.length < $scope.total){
            $scope.items.push((last || 0) + i);

            // Resolve promise to continue infinite scrolling
            resolve();
          }
        }
      }, $scope.delay);
    });

  };
};

MyController.$inject = ['$scope', '$q'];
myApp.controller('MyController', MyController);
```

## Contributing
```bash
$ npm install
$ npm run init

# Make some changes

$ grunt test     # Make sure all tests are passing
$ npm run uglify # Create min file
```
