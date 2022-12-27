import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class MainComponentResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: Object(),
      jsonData2: Object(),
      jsonData3: Object(),
    };
    this._mounted = false;
  }

  componentDidMount() {
    if (this._mounted) return;
    let params = new URLSearchParams(this.props.location.search);
    var idAnime = params.get("idAnime");
    var url = `https://expressminhapp.azurewebsites.net/api/result/${idAnime}`;
    this.getData(url);
    url = `https://expressminhapp.azurewebsites.net/api/result2/${idAnime}`;
    axios.get(url).then(
      (response) => {
        this.setState({
          jsonData2: response.data,
        });
        // release date of film
        const row_date = document.getElementById("row_date");
        const elemTdDate = document.createElement("td");
        elemTdDate.innerHTML = "Release date";
        elemTdDate.setAttribute("style", "font-weight: bold;");
        const elemTdDatePub = document.createElement("td");
        const releaseDate = new Date(response.data[0].datePub.value);
        elemTdDatePub.innerHTML =
          releaseDate.getDate() +
          "-" +
          (releaseDate.getMonth() + 1) +
          "-" +
          releaseDate.getFullYear();
        row_date.appendChild(elemTdDate);
        row_date.appendChild(elemTdDatePub);
        // screen writer
        const row_screen_writer = document.getElementById("row_screen_writer");
        const elemTdScr = document.createElement("td");
        elemTdScr.setAttribute("style", "font-weight: bold;");
        elemTdScr.innerHTML = "Screen writer";
        const elemTdScrWr = document.createElement("td");
        elemTdScrWr.innerHTML = response.data[0].screenWriter.value;
        row_screen_writer.appendChild(elemTdScr);
        row_screen_writer.appendChild(elemTdScrWr);
        // voice actor
        const row_voice_actor = document.getElementById("row_voice_actor");
        const td_voice = document.createElement("td");
        td_voice.setAttribute("style", "font-weight: bold;");
        td_voice.innerHTML = "Voice actor";
        var list_voice = [];
        for (var i in response.data) {
          if (!list_voice.includes(response.data[i].voiceActor.value)) {
            list_voice.push(response.data[i].voiceActor.value);
          }
        }
        var str_voice = "";
        for (i in list_voice) {
          if (i == 0) {
            str_voice += list_voice[i];
          } else {
            str_voice += ", " + list_voice[i];
          }
        }
        const td_voice_actor = document.createElement("td");
        td_voice_actor.innerHTML = str_voice;
        row_voice_actor.appendChild(td_voice);
        row_voice_actor.appendChild(td_voice_actor);
      },
      (error) => {
        console.log(error);
      }
    );

    url = `https://expressminhapp.azurewebsites.net/api/result3/${idAnime}`;
    axios.get(url).then(
      (response) => {
        this.setState({
          jsonData3: response.data,
        });
        // producer
        if (response.data[0].producer != undefined) {
          const row_producer = document.getElementById("row_producer");
          const elemTdProd = document.createElement("td");
          elemTdProd.innerHTML = "Producer";
          elemTdProd.setAttribute("style", "font-weight: bold;");
          const elemTdProducer = document.createElement("td");
          var producers = [];
          for (var i in response.data) {
            if (!producers.includes(response.data[i].producer.value)) {
              producers.push(response.data[i].producer.value);
            }
          }
          var producerStr = "";
          for (var i in producers) {
            if (i == 0) {
              producerStr += producers[i];
            } else {
              producerStr += ", " + producers[i];
            }
          }
          elemTdProducer.innerHTML = producerStr;
          row_producer.appendChild(elemTdProd);
          row_producer.appendChild(elemTdProducer);
        }
        // Production com
        if (response.data[0].productionCom != undefined) {
          const row_production_com = document.getElementById("row_production_com");
          const td_pc = document.createElement("td");
          td_pc.setAttribute("style", "font-weight: bold;");
          td_pc.innerHTML = "Production company";
          const td_pcom = document.createElement("td");
          td_pcom.innerHTML = response.data[0].productionCom.value;
          row_production_com.appendChild(td_pc);
          row_production_com.appendChild(td_pcom);
        }
        // distributed company
        if (response.data[0].distributed != undefined) {
          const row_distributed = document.getElementById("row_distributed");
          const elemTdDis = document.createElement("td");
          elemTdDis.innerHTML = "Distributed by";
          elemTdDis.setAttribute("style", "font-weight: bold;");
          const elemTdDistri = document.createElement("td");
          var distriArr = [];
          for (var i in response.data) {
            if (!distriArr.includes(response.data[i].distributed.value)) {
              distriArr.push(response.data[i].distributed.value);
            }
          }
          var distriStr = "";
          for (var i in distriArr) {
            if (i == 0) {
              distriStr += distriArr[i];
            } else {
              distriStr += ", " + distriArr[i];
            }
          }
          elemTdDistri.innerHTML = distriStr;
          row_distributed.appendChild(elemTdDis);
          row_distributed.appendChild(elemTdDistri);
        }
        // Duration
        const row_duration = document.getElementById("row_duration");
        const td_dur = document.createElement("td");
        td_dur.setAttribute("style", "font-weight: bold;");
        td_dur.innerHTML = "Duration";
        const td_duration = document.createElement("td");
        td_duration.innerHTML = response.data[0].duration.value + " minutes";
        row_duration.appendChild(td_dur);
        row_duration.appendChild(td_duration);
      },
      (error) => {
        console.log(error);
      }
    );
    this._mounted = true;
  }

  getData(url) {
    axios.get(url).then(
      (response) => {
        this.setState({
          jsonData: response.data,
        });
        // label of film
        const row_label = document.getElementById("row_label");
        const elemTD = document.createElement("td");
        elemTD.setAttribute("colspan", "2");
        elemTD.setAttribute("style", "text-align:center; font-weight: bold;");
        elemTD.innerHTML = response.data.filmLabel.value;
        row_label.appendChild(elemTD);
        // logo
        if (response.data.logo !== undefined) {
          const row_img = document.getElementById("row_img");
          const elemTdImg = document.createElement("td");
          elemTdImg.setAttribute("colspan", "2");
          elemTdImg.setAttribute("style", "text-align: center;");
          const elemImg = document.createElement("img");
          elemImg.setAttribute("src", response.data.logo.value);
          elemImg.setAttribute("class", "img-thumbnail");
          elemTdImg.appendChild(elemImg);
          row_img.appendChild(elemTdImg);
        }
        // director
        const row_director = document.getElementById("row_director");
        const td_director = document.createElement("td");
        td_director.setAttribute("style", "font-weight: bold;");
        td_director.innerHTML = "Director";
        const td_name_dir = document.createElement("td");
        td_name_dir.innerHTML = response.data.director.value;
        row_director.appendChild(td_director);
        row_director.appendChild(td_name_dir);
        //genre of film
        const row_genre = document.getElementById("row_genre");
        const td_genre = document.createElement("td");
        td_genre.setAttribute("style", "font-weight: bold;");
        td_genre.innerHTML = "Genre";
        const td_genre_text = document.createElement("td");
        td_genre_text.innerHTML = response.data.genre.value;
        row_genre.appendChild(td_genre);
        row_genre.appendChild(td_genre_text);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleSearchButton() {
    const nameAnime = document.getElementById("search_name_anime").value;
    const dateFrom = "1900-01-01";
    var today = new Date();
    const dateTo =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    window.location.assign(
      `/searchedResult?name=${nameAnime}&director=&dateFrom=${dateFrom}&dateTo=${dateTo}`
    );
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Home
            </a>
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                id="search_name_anime"
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={this.handleSearchButton}
              >
                Search
              </button>
            </div>
          </div>
        </nav>

        <table className="table table-bordered">
          <tbody className="table-group-divider">
            <tr id="row_label"></tr>
            <tr id="row_img"></tr>
            <tr id="row_director"></tr>
            <tr id="row_genre"></tr>
            <tr id="row_date"></tr>
            <tr id="row_screen_writer"></tr>
            <tr id="row_voice_actor"></tr>
            <tr id="row_producer"></tr>
            <tr id="row_production_com"></tr>
            <tr id="row_distributed"></tr>
            <tr id="row_duration"></tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default MainComponentResult;
