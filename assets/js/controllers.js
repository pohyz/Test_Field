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
  $scope.haha = "abc";
  $scope.updateUserType_C = function(){

    $scope.Model.send({'user_type':"cpr",'ut_method':'set_user_type_c'},function(response){$scope.haha=response.redirect_url;});
  };

  $scope.updateUserType_I = function(){

    $scope.Model.send({'user_type':"ind",'ut_method':'set_user_type_i'},function(response){location.href=response.redirect_url;});
  };
}

function ProfileCtrl($scope, $resource, $compile) {
    
    $scope.u_profile;
    $scope.display_form;
    $scope.user_type;

    $scope.Model = $resource("http://galaxy-osmosis.appspot.com/db/:function",
    {},
    {"send": {method: 'JSONP', isArray: false, params: {callback: 'JSON_CALLBACK'}}}
    );

    $scope.check_login = function(){
      $scope.Model.send({'function':'check_login'},function(response){
        var redirect_url = response.redirect_url;

        if(redirect_url != null){
          location.href=response.redirect_url;
        }
      });
    };

    $scope.get_profile = function(){

      $scope.Model.send({'function':'get_profile'},function(response){
        $scope.u_profile = response.u_profile;
        $scope.user_type = response.user_type;

        if($scope.user_type == "ind"){

          var form_d = angular.element(document.getElementById('form_display'));
          form_d.append("<table><tr><td>Student Name:</td>"
          +"<td><input type='text' ng-model='u_profile.stud_name'></td></tr>"
          +"<tr><td>Year of Admission:</td>"
          +"<td><input type='text' ng-model='u_profile.yoa'></td></tr>"
          +"<tr><td>Email Address:</td>"
          +"<td><input type='text' ng-model='u_profile.email'></td></tr>"
          +"<tr><td>Key Skills:</td>"
          +"<td><input type='text' ng-model='u_profile.skill'></td></tr>"
          +"<tr><td>About Student:</td>"
          +"<td><input type='text' ng-model='u_profile.about_stud'></td></tr></table>");
          $compile(form_d)($scope);
        }
        else{

          $scope.display_form = "<table><tr><td>Corporate:</td></table>";
        }
      });
    };
}