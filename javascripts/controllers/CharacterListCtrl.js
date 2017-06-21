app.controller("CharacterListCtrl", function($rootScope, $scope, CharacterFactory) {

  $scope.characters = [];

  let getCharacters = () => {
    CharacterFactory.getCharacterList($rootScope.user.uid).then((characterz)=>{
      $scope.characters = characterz;
    }).catch((error)=> {
      console.log("got an error", error);
    });
  };

  getCharacters();

  $scope.deleteCharacter = (characterId) => {
    CharacterFactory.deleted(characterId).then(() => {
      getCharacters();
    }).catch((error) => {
      console.log("delete", error);
    });
  };



});