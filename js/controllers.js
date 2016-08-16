/**
 * Created by rajab on 8/15/16.
 */
'use strict';
var appControllers = angular.module('appControllers', [])

.controller('HomeController', function($scope) {
    $scope.hello = 'Hello';
});
