import React, { Component } from "react";
import axios from "axios";
import UpperSearchBarComponent from "../upperSearchBarComponent";

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
    var url = `https://expressminhapp.azurewebsites.net/api/anime?name=${nameAnime}&director=${director}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    axios.get(url)
    .then(
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

  render() {
    return (
      <React.Fragment>
        <UpperSearchBarComponent />
      </React.Fragment>
    );
  }
}

export default ComponentSearchedResult;
