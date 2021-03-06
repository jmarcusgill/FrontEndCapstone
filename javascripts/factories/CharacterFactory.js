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
     $http.get(`https://comic-get-it-proxy.herokuapp.com/api/comicFinder/characters/?api_key=${COMICVINE_CONFIG.apiKey}&format=json&filter=name:${userInput}`, JSON.stringify(userInput))
      .then((APIresultz) => {
        resolve(APIresultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let postNewCharacter = (newCharacter) => {
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

  let deleted = (id) => {
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/characters/${id}.json`)
      .then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  };


  return {getCharacterList:getCharacterList, findMyCharacter:findMyCharacter, postNewCharacter:postNewCharacter, deleted:deleted};



});