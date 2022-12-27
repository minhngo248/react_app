import React, { Component } from "react";
import axios from "axios";

class ComponentSearchedResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: Object(),
    };
    this._mounted = false;
  }

  componentDidMount() {
    if (this._mounted) return;
    const params = new URLSearchParams(this.props.location.search);
    const nameAnime = params.get("name");
    const director = params.get("director");
    const dateFrom = params.get("dateFrom");
    const dateTo = params.get("dateTo");
    const elemRoot = document.getElementById("root");
    const elemInfo = document.createElement("div");
    elemInfo.setAttribute("id", "info_anime");
    const url = `https://expressminhapp.azurewebsites.net/api/anime?name=${nameAnime}&director=${director}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    axios.get(url).then(
      (response) => {
        this.setState({
          jsonData: response.data,
        });
        const elemText = document.createElement("h3");
        elemText.innerHTML = "Results";
        elemText.setAttribute("id", "h3_results");
        elemInfo.appendChild(elemText);
        const elemUL = document.createElement("ul");
        elemUL.setAttribute("id", "ul_results");
        for (var i in response.data) {
          const elemA = document.createElement("a");
          var string = new String(response.data[i].item.value);
          var indQ = string.indexOf("Q");
          var idAni = string.slice(indQ, string.length);
          elemA.setAttribute("href", "/result?idAnime=" + idAni);
          elemA.innerHTML = response.data[i].name.value;
          const elemLI = document.createElement("li");
          elemLI.appendChild(elemA);
          elemUL.appendChild(elemLI);
        }
        elemInfo.appendChild(elemUL);
        elemRoot.appendChild(elemInfo);
      },
      (error) => {
        console.log(error);
      }
    );
    this._mounted = true;
  }

  handleSearchButton() {
    const nameAnime = document.getElementById("search_name_anime").value;
    const dateFrom = "1900-01-01";
    var today = new Date();
    const dateTo = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    window.location.assign(
      `/searchedResult?name=${nameAnime}&director=&dateFrom=${dateFrom}&dateTo=${dateTo}`
    );
  }

  render() {
    return (
      <React.StrictMode>
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
      </React.StrictMode>
    );
  }
}

export default ComponentSearchedResult;
