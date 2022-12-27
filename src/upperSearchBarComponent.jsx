import React, { Component } from "react";

class UpperSearchBarComponent extends Component {
  state = {};

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
      encodeURI(
        `/searchedResult?name=${nameAnime}&director=&dateFrom=${dateFrom}&dateTo=${dateTo}`
      )
    );
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              NavBar
            </a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/topRating">Top rating</a>
              </li>
              </ul>
            </div>
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
      </React.Fragment>
    );
  }
}

export default UpperSearchBarComponent;
