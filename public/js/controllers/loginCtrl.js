/**
 * Created by PatricioXavier on 9/25/2015.
 */

'use strict';
var app = angular.module('MoviApp', ['ngResource']);

app.controller('loginController', ["$scope", "$timeout", "$resource", "$window", function ($scope, $timeout, $resource, $window) {
    //Load Style sheets

    //head.load(AppConfigSettings.Assets.cssIndex, function () {
    //    //Pages Loaded
    //});

    //$scope.username = 'xavier';

    $scope.Login = function () {
        var url = "/api/authenticate/:username/:password";
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
                $window.location.href = '/retoMovi';
                //$location.path("/");
                //$location.replace("/");
            } else {
                alert("MAL");
            }
        });

    };

    $scope.createAccount=function(){
        $scope.frmModo="cuenta";
        //$window.location.href = '/CreateAccount';
    }

    $scope.Regresar=function(){
        $scope.frmModo="login";
        //$window.location.href = '/CreateAccount';
    }

    $scope.Registrar=function(){
        var url = "/api/users";
        var res = $resource('', {}, {
            Invocar: {
                url: url,
                method: 'POST'
                //isArray: true
                //headers: myHeaders
                //timeout: timeout.promise
            }
        });
        var user={
            "username": $scope.newusername,
            "name": $scope.name,
            "lastName": $scope.lastname,
            "birthday": $scope.birthday,
            "cellphone": $scope.cellphone,
            "sex": $scope.sex,
            "email": $scope.email,
            "password": $scope.passwordnew
        };
        res.Invocar(user, function (resOk) {
            if (resOk.message && resOk.message=="User Added") {
                alert("creado");
                $scope.frmModo="login";
            } else {
                alert("no creado");
            }
        });
    }
    $scope.pageLoad = function () {
        $scope.frmModo="login";
        //var url = "http://localhost:3001/api/getUsers";
        //var res = $resource('', {}, {
        //    Invocar: {
        //        url: url,
        //        method: 'GET',
        //        isArray: true
        //        //headers: myHeaders
        //        //timeout: timeout.promise
        //    }
        //});
        //res.Invocar({}, function (resOk) {
        //    $scope.username = resOk[0].username;
        //});

        $timeout(function () {
            $scope.pageLoading = false;
        }, 1000);
    };
    $scope.pageLoad();
}]);

