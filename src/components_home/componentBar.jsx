/* Component of bar search */
import React, { Component } from "react";
import axios from "axios";

class ComponentBar extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      jsonData: Object()
    }
  }

  handleSearchButton = () => {
    const elemInfo = document.getElementById("info_anime");
    const nameAnime = document.getElementById("nameAnime").value;
    const director = document.getElementById('director').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const url = `https://expressminhapp.azurewebsites.net/api/anime/${nameAnime}/${director}/${dateFrom}/${dateTo}`;
    axios.get(url)
    .then( (response) => {
        this.setState({
          jsonData: response.data
        });
        const elemText = document.createElement('h3');
        elemText.innerHTML = 'Results';
        elemText.setAttribute('id', 'h3_results');
        elemInfo.appendChild(elemText);
        const elemUL = document.createElement('ul');
        elemUL.setAttribute('id', 'ul_results');
        for (var i in response.data) {
          const elemA = document.createElement("a");
          var string = new String(response.data[i].item.value);
          var indQ = string.indexOf('Q');
          var idAni = string.slice(indQ, string.length);
          elemA.setAttribute("href", "/result?idAnime=" + idAni);
          elemA.innerHTML = response.data[i].name.value;
          const elemLI = document.createElement('li');
          elemLI.appendChild(elemA);
          elemUL.appendChild(elemLI);
        }
        elemInfo.appendChild(elemUL);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render() { 
    return (
      <React.Fragment>
        <label>Name of anime:</label>
        <br />
        <input type="text" id="nameAnime" name="nameAnime" placeholder="name"/><br/>  
        <label>Director </label>
        <input type="text" id="director" name="director" placeholder="some text"/><br />
        <label>Release date </label><br/>
        From <input type="date" id="dateFrom" name="dateFrom" /> to <input type="date" id="dateTo" name="dateTo"/>
        <br />
        <button id="button_search" onClick={this.handleSearchButton}>Search</button><br />
      </React.Fragment>
    );
  }
}

export default ComponentBar;
