app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthFactory, UserFactory){

  $scope.alerts = [];
  $scope.auth = {
    email: "marcus@m.com",
    password: "123456"
  };
  $scope.showLoginView = true;
  $scope.showLoginbutton = true;

  $scope.showLogin = () => {
    $scope.showLoginView = false;
    $scope.showLoginbutton = false;

    console.log("click works");
  };

  if ($location.path() === "/logout"){
    AuthFactory.logout();
    $rootScope.user = {};
    $location.url("/auth");
  }

  let logMeIn = () => {
    AuthFactory.authenticate($scope.auth).then((userCreds) => {
      return UserFactory.getUser(userCreds.uid);
    }, (error) => {
      $scope.alerts.push({msg: error.message});
      console.log("authenticate error", error);
    }).then((user) => {
      $rootScope.user = user;
      $location.url("/comic/list");
    }).catch((error) => {
      console.log("getUser error", error);
    });
  };

  $scope.registerUser = () => {
    AuthFactory.registerWithEmail($scope.auth).then((didRegister) =>{
      $scope.auth.uid = didRegister.uid;
      return UserFactory.addUser($scope.auth);
    }, (error) => {
      console.log("registerWithEmail error", error);
    })
    .then((registerComplete) => {
      console.log("registerComplete", registerComplete);
      logMeIn();
    }).catch((error) => {
      console.log("addUser error", error);
    });
  };

  $scope.loginUser = () => {
    logMeIn();
  };

  $scope.myInterval = 3500;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: '/images/carousel/carousel-4.png',
      text: 'Got A Favorite Character?',
      id: currIndex++
    });
    slides.push({
      image: '/images/carousel/carousel-2.jpg',
      text: 'Search For Your Favorite Titles!',
      id: currIndex++
    });
    slides.push({
      image: '/images/carousel/carousel-3.jpg',
      text: 'Rate Which Comic Is Best!',
      id: currIndex++
    });
    slides.push({
      image: '/images/carousel/carousel-5.jpg',
      text: 'Are you a hero, or villian?',
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 1; i++) {
    $scope.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }




});