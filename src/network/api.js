let consumeAPI = 'https://rallycoding.herokuapp.com/api/music_albums';

class APIs {

  readJSON(url) {
    return fetch(url).then(response => {
      return response.json();
    }).catch(e => {
      console.log('catch: ', e);
    });
  }

  getData(){
    let url =`${consumeAPI}`;
    return this.readJSON(url);
  }
}

export default new APIs();
