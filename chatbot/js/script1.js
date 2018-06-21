// Code goes here

var SpeechApp = angular.module('SpeechApp', []);

function VoiceCtrl($scope) {

  $scope.said='...';

  $scope.helloWorld = function() {
    $scope.said = "Hello world!";
  }

  // $scope.commands = {
  //   'hello (world)': function() {
  //     if (typeof console !== "undefined") console.log('hello world!')
  //     $scope.$apply($scope.helloWorld);
  //   },
  //   'result': function(whatWasHeardArray) {
  //     if (typeof console !== "undefined") console.log('hey!')
  //        console.log(whatWasHeardArray)
  //     $scope.$apply($scope.helloWorld);
  //   }
  // };; 

  annyang.debug();
  annyang.addCallback('result', function(whatWasHeardArray) {
    console.log(whatWasHeardArray)
  });
  annyang.init( );
   
  annyang.start();
 
}