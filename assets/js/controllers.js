'use strict';

function LoginCtrl($scope, $resource) {

  $scope.Model = $resource("http://galaxy-osmosis.appspot.com/db/link",
    {},
    {"send": {method: 'JSONP', isArray: false, params: {callback: 'JSON_CALLBACK'}}}
    );
  $scope.login_url;
  $scope.nickname;
  $scope.getLink = function(){

    $scope.Model.send({}, function(response){

      $scope.login_url = response.login_url;
      $scope.nickname = response.nickname;
    });
  };

  $scope.getLink();
}

function UserTypeCtrl($scope, $resource) {
  
  $scope.Model = $resource("http://galaxy-osmosis.appspot.com/db/:ut_method",
    {},
    {"send": {method: 'JSONP', isArray: false, params: {callback: 'JSON_CALLBACK'}}}
    );

  $scope.updateUserType_C = function(){

    $scope.Model.send({'ut_method':'set_user_type_c'},function(response){location.href=response.redirect_url;});
  };

  $scope.updateUserType_I = function(){

    $scope.Model.send({'ut_method':'set_user_type_i'},function(response){location.href=response.redirect_url;});
  };
}

function ProfileCtrl($scope, $resource) {
  
}