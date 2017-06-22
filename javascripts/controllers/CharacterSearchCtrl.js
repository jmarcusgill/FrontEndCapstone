app.controller("CharacterSearchCtrl", function($scope, $rootScope, ngToast, CharacterFactory){

  $scope.characterSearch = "";
  $scope.characterAPIresults = [];
  $scope.newCharacter = {
    isVillain: false
  };


  $scope.findCharacters = ( ) => {
    $scope.newCharacter.uid = $rootScope.user.uid;
    CharacterFactory.findMyCharacter($scope.characterSearch).then((characterAPIresults) => {
      $scope.characterAPIresults = characterAPIresults.data.results;
    }).catch((error) => {
      console.log("error", error);
    });
  };

  $scope.isHero = (character) => {
  $scope.newCharacter.isVillain = false;
  $scope.newCharacter.name = character.name;
  $scope.newCharacter.real_name = character.real_name;
  $scope.newCharacter.image = character.image.medium_url;
  $scope.newCharacter.description = character.deck;
  $scope.newCharacter.first_appeared = character.first_appeared_in_issue.name;
  $scope.newCharacter.uid = $rootScope.user.uid;
  CharacterFactory.postNewCharacter($scope.newCharacter).then((response) => {
    $scope.newCharacter = { };
    ngToast.create('Character Saved to Heroes!');

    }).catch((error) => {
      console.log("Add error", error);
    });
  };

$scope.isVillain = (character) => {
  $scope.newCharacter.isVillain = true;
  $scope.newCharacter.name = character.name;
  $scope.newCharacter.real_name = character.real_name;
  $scope.newCharacter.image = character.image.medium_url;
  $scope.newCharacter.description = character.deck;
  $scope.newCharacter.first_appeared = character.first_appeared_in_issue.name;
  $scope.newCharacter.uid = $rootScope.user.uid;
  CharacterFactory.postNewCharacter($scope.newCharacter).then((response) => {
    $scope.newCharacter = { };
    ngToast.create('Character Saved to Villains!');
    }).catch((error) => {
      console.log("Add error", error);
    });
  };

  $scope.hoverIn = function(){
        this.hoverButtons = true;
    };

    $scope.hoverOut = function(){
        this.hoverButtons = false;
    };


});