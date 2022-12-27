/* Component of bar search */
import React, { Component } from "react";

class ComponentBar extends Component {
  constructor(props) {
    super(props); 
    this.state = {
    }
  }

  handleSearchButton() {
    const nameAnime = document.getElementById("nameAnime").value;
    const director = document.getElementById('director').value;
    var dateFrom = document.getElementById('dateFrom').value;
    if (dateFrom === '') {
      dateFrom = '1900-01-01';
    }
    var dateTo = document.getElementById('dateTo').value;
    if (dateTo === '') {
      var today = new Date();
      dateTo = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    }
    window.location.assign(`/searchedResult?name=${nameAnime}&director=${director}&dateFrom=${dateFrom}&dateTo=${dateTo}`);
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
        <button id="button_search" onClick={this.handleSearchButton}>Search</button>
      </React.Fragment>
    );
  }
}

export default ComponentBar;
