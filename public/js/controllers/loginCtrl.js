/**
 * Created by PatricioXavier on 9/25/2015.
 */

'use strict';
var app = angular.module('MoviApp', []);

app.controller('loginController', ["$scope", "$timeout", function ($scope, $timeout) {
    //Load Style sheets

    head.load(AppConfigSettings.Assets.cssIndex, function () {
        //Pages Loaded
    });

    $scope.username = 'xavier';

    $scope.Login=function(){
        alert("hola");
    };

    $scope.pageLoad = function () {
        var res = $resource('', {}, {
            Invocar: {
                url: url,
                method: 'POST',
                headers: myHeaders
                //timeout: timeout.promise
            }
        });
        
        $scope.users=
        $timeout(function () {
            $scope.pageLoading = false;
        }, 1000);
    };
    $scope.pageLoad();
}]);

