app.controller("CharacterListCtrl", function($rootScope, $scope, CharacterFactory) {

  $scope.characters = [];

  let getCharacters = () => {
    CharacterFactory.getCharacterList($rootScope.user.uid).then((characterz)=>{
      $scope.characters = characterz;
      console.log("in charlistctrl: characters", $scope.characters);
    }).catch((error)=> {
      console.log("got an error", error);
    });
  };

  getCharacters();

  $scope.deleteCharacter = (characterId) => {
    console.log("delete char working");
    CharacterFactory.deleted(characterId).then(() => {
      getCharacters();
    }).catch((error) => {
      console.log("delete", error);
    });
  };



});