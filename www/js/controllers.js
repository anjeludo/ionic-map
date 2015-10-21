angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, Markers) {
  //console.log(Markers.getMarkers());
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      var latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      $scope.map.setCenter(latLng);
      $scope.loading.hide();

      //Wait until the map is loaded
      // Ponemos un marker
      google.maps.event.addListenerOnce($scope.map, 'idle', function(){
        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });    

        var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
        });
 
        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });  
      });

      
 

    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });


    
  };
})


.factory('Markers', function($http) {
 
  var markers = [];
 
  return {
    getMarkers: function(){
 
      return $http
            .get("https://www.")
            .then(function(response) {
              markers = response;
              return markers;
            }
      );
 
    }
  }
})
