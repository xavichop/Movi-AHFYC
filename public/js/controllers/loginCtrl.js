/**
 * Created by PatricioXavier on 9/25/2015.
 */

'use strict';
var app = angular.module('MoviApp', ['ngResource']);

app.controller('loginController', ["$scope", "$timeout", "$resource", "$window", function ($scope, $timeout, $resource, $window) {
    //Load Style sheets

    head.load(AppConfigSettings.Assets.cssIndex, function () {
        //Pages Loaded
    });

    //$scope.username = 'xavier';

    $scope.Login = function () {
        var url = "http://localhost:3001/api/authenticate/:username/:password";
        var res = $resource('', {}, {
            Invocar: {
                url: url,
                method: 'GET'
                //isArray: true
                //headers: myHeaders
                //timeout: timeout.promise
            }
        });
        res.Invocar({username: $scope.username, password: $scope.password}, function (resOk) {
            if (resOk.autenticate) {
                $window.location.href = '/';
                //$location.path("/");
                //$location.replace("/");
            } else {
                alert("MAL");
            }
        });

    };

    $scope.pageLoad = function () {
        var url = "http://localhost:3001/api/getUsers";
        var res = $resource('', {}, {
            Invocar: {
                url: url,
                method: 'GET',
                isArray: true
                //headers: myHeaders
                //timeout: timeout.promise
            }
        });
        res.Invocar({}, function (resOk) {
            $scope.username = resOk[0].username;
        });

        $timeout(function () {
            $scope.pageLoading = false;
        }, 1000);
    };
    $scope.pageLoad();
}]);

