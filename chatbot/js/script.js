var app = angular.module('chatApp', [  'app.directives']);
app.controller('chatController', function (AnnyangService,$scope, $http, $location, $anchorScroll, $rootScope) {

  $scope.botName = "AI Bot"
  $scope.debug=true;
  $scope.imgname=''
  $scope.botText = "Hold and Talk to me or Type Text"
  $scope.chatInput = 'i am a Bot , you can ask em anything i will guide you '
  $scope.chatData = [{ type: 'message', messages: $scope.chatInput, isMe: false }];

/*starts */
var vm = this;

vm.init = function() {
    vm.clearResults();

    AnnyangService.addCommand('*allSpeech', function(allSpeech) {
        console.debug(allSpeech);
        vm.addResult(allSpeech);

    });
    
    AnnyangService.start();
};

vm.addResult = function(result) {
  console.log("kabeer",result)

 
     $scope.chatInput =result
     $scope.postIt()
    vm.results.push({
        content: result,
        date: new Date()
    });
};

vm.clearResults = function() {
    vm.results = [];
};

vm.init();

  /*ends*/
  $scope.checkwordkey=function(key){
  //alert( $scope.imgname+'cjecl'+key)
 
    return key== $scope.imgname;
  }

  $scope.speak = function (speechtext) {
   //window.fromangular(speechtext)
    speechtext=speechtext.toUpperCase()

//   var msg = new SpeechSynthesisUtterance(speechtext);
// msg.volume = 1; // 0 to 1
// msg.rate =0.7; // 0.1 to 10
// msg.pitch = 2; //0 to 2
// msg.lang = 'en-in';
//     window.speechSynthesis.speak( msg);
playsyncronized(speechtext)
    $scope.chatInput = '';
  }




  $scope.startTalk = function (data) {
    $scope.botText = "I am Listening to you"
    console.log("start speech")
  }


  $scope.endTalk = function (data) {
    $scope.botText = "Hold and Talk to me or Type Text"
    console.log("stop event called", $rootScope.transcript)
    $scope.chatInput = $rootScope.transcript
   
   
    var wordsIp= $scope.chatInput 
    console.log("end  speech", $scope.chatInput)
    $scope.postIt()

  }




  //$scope.speak($scope.chatInput)
  // $scope.gotoBottom = function () {
  //   $location.hash('bottom');
  //   $anchorScroll();
  // };


  $scope.postIt = function () {
    if ($scope.chatInput == "" || $scope.chatInput == " ") {
      alert("talk to me please")
      return false;
    }

    $scope.chatData.push({ type: 'message', messages: $scope.chatInput, isMe: true })
    $scope.chatWithServer();
  }

  $scope.debugs=function(){

    $scope.debug=false
  }
  $scope.nodebug=function(){

    $scope.debug=true
  }
  $scope.chatWithServer = function () {

    var botServiceUrl = "http://localhost:3006/?user=" + $scope.chatInput
    var requstData = {};
    var req = {
      method: 'GET',
      url: botServiceUrl,
      data: requstData
    }
    console.log("chat server called req", req)

    $http(req).then(function (res) {
      console.log('sucess  data', res.data)
      if (res.data == '') {
        res.data = "sorry i didnt get that "
      }
      mine = res.data
      $scope.speak(mine.split("##")[0])
      $scope.botText = mine.split("##")[0]
      console.log("is action incomplete", mine.split("##")[2])

      if (mine.split("##")[2] && mine.split("##")[1] == 'login.me') {
        alert("MAsk and send data")
      }

      if (mine.split("##")[1]) {
        if (mine.split("##")[1] == "redirect.google") {
          alert("you have action")
          //window.location.href="https://www.google.co.in/"
          window.open("https://www.google.co.in/")
        }
        if (mine.split("##")[1] == "goto.youtube") {
          alert("you have action")
          window.open("https://www.youtube.com")
        }

      }


      $scope.chatData.push({ type: 'message', messages: mine.split("##")[0], isMe: false })
    });



    
  }
});