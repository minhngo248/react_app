import axios from "axios";

class GetAnimes {

  getData() {
    return axios.get(`/api/animes`).then(
      (response) => response.data,
      (error) => {
        console.log(error);
      }
    );
  }

  matchFilm(listFilm, value) {
    return (
      listFilm.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  matchDirector(listDirector, value) {
    return (
      listDirector.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
}

export default GetAnimes;
