/* Component of bar search */
import React, { Component } from "react";
import axios from "axios";

class ComponentBar extends Component {
  state = {
    jsonData: Object()
  }

  handleSubmitButton = () => {
    const elemInfo = document.getElementById("info_anime");
    const nameAnime = document.getElementById("nameAnime").value;
    const director = document.getElementById('director').value;
    const date = document.getElementById('dateAnime').value;
    const url = `https://expressminhapp.azurewebsites.net/api/anime/${nameAnime}/${director}/${date}`;
    axios.get(url)
    .then( (response) => {
        this.setState({
          jsonData: response.data
        });
        const elemText = document.createElement('h3');
        elemText.innerHTML = 'Results';
        elemInfo.appendChild(elemText);
        const elemUL = document.createElement('ul');
        for (var i in response.data) {
          const elemA = document.createElement('a');
          elemA.setAttribute('href', '/result.html');
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

  handleFilterButton() {
    const elemMore = document.getElementById('more');
    elemMore.setAttribute('style', 'display: block');
  }

  render() { 
    return (
      <React.Fragment>
        <label>Name of anime:</label>
        <br />
        <input type="text" id="nameAnime" name="nameAnime" placeholder="name"/>
        <button id="button_filter" onClick={this.handleFilterButton}>Filter</button><br/>  
        <div id="more" style={{ display: "none" }}>
        <label>Director </label>
        <input type="text" id="director" name="director" placeholder="some text"/>
        <label>Release date </label>
        <input type="date" id="dateAnime" name="dateAnime" /><br />
        </div>
        <button id="button_search" onClick={this.handleSubmitButton}>Submit</button><br />
      </React.Fragment>
    );
  }
}

export default ComponentBar;