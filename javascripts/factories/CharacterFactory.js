app.factory("CharacterFactory", function($http, $q, FIREBASE_CONFIG, COMICVINE_CONFIG) {

  let getCharacterList = (userId) => {
    let currentcharacterz = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/characters.json?orderBy="uid"&equalTo="${userId}"`)
      .then((fbItems)=> {
        let itemCollection = fbItems.data;
        if (itemCollection !== null) {
          Object.keys(itemCollection).forEach((key) => {
              itemCollection[key].id=key;
              currentcharacterz.push(itemCollection[key]);
            });
        }
          resolve(currentcharacterz);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };




  let findMyCharacter = (userInput) => {
    return $q ((resolve, reject) => {
     $http.get(`http://comicvine.gamespot.com/api/characters/?api_key=${COMICVINE_CONFIG.apiKey}&format=json&filter=name:${userInput}`, JSON.stringify(userInput))
      .then((APIresultz) => {
        resolve(APIresultz);
        console.log("in charfactory", APIresultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let postNewCharacter = (newCharacter) => {
    console.log(newCharacter);
    return $q ((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/characters.json`,
        JSON.stringify(newCharacter)
        ).then((resultz) => {
        resolve(resultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };


  return {getCharacterList:getCharacterList, findMyCharacter:findMyCharacter, postNewCharacter:postNewCharacter};



});