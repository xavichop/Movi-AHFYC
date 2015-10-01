/**
 * Created by PatricioXavier on 9/25/2015.
 */


//inject angular file upload directives and services.
var app = angular.module('MoviApp', ['ngFileUpload', 'uiGmapgoogle-maps', 'ngResource']);


app.controller('userDashboardCtrl', ['$scope', 'Upload', '$timeout', '$log', '$resource', '$window', function ($scope, Upload, $timeout, $log, $resource, $window) {

    //$upload.upload({
    //    url: 'api/user/uploads',
    //    method: 'POST',
    //    data: data // Any data needed to be submitted along with the files
    //    file: files
    //});
    $scope.map = {
        center: {latitude: -0.18189495786972482, longitude: -78.4675376734192},
        zoom: 12,
        bounds: {}
    };


    //$scope.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;

    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
        if (_.isEqual(newVal, oldVal))
            return;
        $scope.coordsUpdates++;
    });


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
                $scope.getPostsLocation();
            }
        });
    }
    $scope.getPostsLocation = function () {
        $scope.postsLocation = [];
        $scope.userPosts.forEach(function (userPost,i) {
            userPost.location.id=i;
            userPost.location.options = {
                draggable: false,
                labelContent: "usuario:" + userPost.username + "<br/>lat: " + userPost.location.latitude + '<br/>' + 'lon: ' + userPost.location.longitude,
                labelAnchor: "100 0",
                labelClass: "marker-labels"
            };
            $scope.postsLocation.push(userPost.location);
        })
        console.log($scope.postsLocation);

    }

    $scope.Regresar = function () {
        $scope.frmModo = "mostrarPosts";
        //$window.location.href = '/CreateAccount';
    }

    $scope.gotoCreatePost = function () {
        $window.location.href = '/createPost';
    }
    $scope.pageLoad = function () {

        $scope.getUserPosts();

    }
    $scope.pageLoad();

    var createMarkers = function (i, bounds, idKey) {
        var lat_min = bounds.southwest.latitude,
            lat_range = bounds.northeast.latitude - lat_min,
            lng_min = bounds.southwest.longitude,
            lng_range = bounds.northeast.longitude - lng_min;

        if (idKey == null) {
            idKey = "id";
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);
        var ret = {
            latitude: latitude,
            longitude: longitude,
            title: 'm' + i
        };
        ret[idKey] = i;
        return ret;
    };
    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function () {
        return $scope.map.bounds;
    }, function (nv, ov) {
        // Only need to regenerate once
        if (!ov.southwest && nv.southwest) {
            var markers = [];
            //for (var i = 0; i < 50; i++) {
            //    markers.push(createMarkers(i, $scope.map.bounds))
            //}
            $scope.postsLocation.forEach(function(postLocation){
                markers.push(postLocation)
            })

            $scope.randomMarkers = markers;
        }
    }, true);
}])
;