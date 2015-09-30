/**
 * Created by PatricioXavier on 9/25/2015.
 */


//inject angular file upload directives and services.
var app = angular.module('MoviApp', ['ngFileUpload', 'uiGmapgoogle-maps', 'ngResource']);


app.controller('userDashboardCtrl', ['$scope', 'Upload', '$timeout', '$log', '$resource', function ($scope, Upload, $timeout, $log, $resource) {

    //$upload.upload({
    //    url: 'api/user/uploads',
    //    method: 'POST',
    //    data: data // Any data needed to be submitted along with the files
    //    file: files
    //});
    $scope.map = {center: {latitude: -0.18189495786972482, longitude: -78.4675376734192}, zoom: 8};


    $scope.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;

    $scope.marker = {
        id: 0,
        coords: {
            latitude: 40.1451,
            longitude: -99.6680
        },
        options: {draggable: true},
        events: {
            dragend: function (marker, eventName, args) {
                $log.log('marker dragend');
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                $log.log(lat);
                $log.log(lon);

                $scope.marker.options = {
                    draggable: true,
                    labelContent: "lat: " + $scope.marker.coords.latitude + '<br/>' + 'lon: ' + $scope.marker.coords.longitude,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    };

    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
        if (_.isEqual(newVal, oldVal))
            return;
        $scope.coordsUpdates++;
    });

    $scope.createPost = function (picture) {
        picture.upload = Upload.upload({
            url: 'api/user/uploads',
            data: {
                title: $scope.frmUserPost.postTitle,
                file: picture,
                detail: $scope.frmUserPost.postDetail,
                location: $scope.marker.coords,
                time: new Date(),
                username: $scope.username?$scope.username:"xavivacio",
                category: $scope.frmUserPost.category.category
            }
        });

        picture.upload.then(function (response) {
            $timeout(function () {
                picture.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        picture.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            picture.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }

    $scope.uploadPic = function (file) {
        file.upload = Upload.upload({
            url: 'api/user/uploads',
            data: {file: file, username: $scope.username},
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }

    $scope.getCurrentLocation = function () {
        navigator.geolocation.getCurrentPosition(function (position) {

            $scope.map = {
                center: {latitude: position.coords.latitude, longitude: position.coords.longitude},
                zoom: 15
            };

            $timeout(function () {
                $scope.marker.coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                $scope.dynamicMoveCtr++;
            }, 1000);
        });
    };

    $scope.getCategories = function () {
        var url = "/api/categories";
        var res = $resource('', {}, {
            Invocar: {
                url: url,
                method: 'GET',
                isArray: true
            }
        });
        res.Invocar({}, function (resOk) {
            if (resOk) {
                $scope.categories = resOk;
                $scope.frmUserPost.category = $scope.categories[0];

            }
        });
    }

    $scope.getUserPosts = function () {
        var url = "/api/userPosts";
        var res = $resource('', {}, {
            Invocar: {
                url: url,
                method: 'GET',
                isArray: true
            }
        });
        res.Invocar({}, function (resOk) {
            if (resOk) {
                $scope.userPosts = resOk;
            }
        });
    }

    $scope.pageLoad = function () {
        $scope.getCurrentLocation();
        $scope.getCategories();
        $scope.getUserPosts();
    }
    $scope.pageLoad();
}])
;