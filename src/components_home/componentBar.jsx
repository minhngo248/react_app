/* Component of bar search */
import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import GetAnimes from "../getAnimes";
import Autocomplete from "react-autocomplete";

class ComponentBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonFilm: Object(),
      jsonDirector: Object(),
      value: "",
      valueDir: ""
    };
    this._mounted = false;
  }

  componentDidMount() {
    if (this._mounted) return;
    var getAni = new GetAnimes();
    getAni.getData().then((d) => {
      var list = [];
      var listDir = [];
      for (var ind in d) {
        list.push({ name: d[ind].itemLabel.value });
        listDir.push({ name: d[ind].director.value });
      }
      this.setState({
        jsonFilm: list,
        jsonDirector: listDir,
      });
    });
    this._mounted = true;
  }

  handleSearchButton() {
    const nameAnime = document.getElementById("nameAnime").value;
    const director = document.getElementById("director").value;
    var dateFrom = document.getElementById("dateFrom").value;
    if (dateFrom === "") {
      dateFrom = "1900-01-01";
    }
    var dateTo = document.getElementById("dateTo").value;
    if (dateTo === "") {
      var today = new Date();
      dateTo =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    }
    window.location.assign(
      encodeURI(
        `/searchedResult?name=${nameAnime}&director=${director}&dateFrom=${dateFrom}&dateTo=${dateTo}`
      )
    );
  }

  render() {
    var getAni = new GetAnimes();
    return (
      <React.Fragment>
        <div className="d-block">
        <label>Name of anime:</label>
        <br />
        <Autocomplete
          value={this.state.value}
          inputProps={{ id: "nameAnime" }}
          wrapperStyle={{
            position: "relative",
            display: "inline-block",
          }}
          items={this.state.jsonFilm}
          getItemValue={(item) => item.name}
          shouldItemRender={getAni.matchFilm}
          onChange={(event, valueName) => this.setState({ value: valueName })}
          onSelect={(valueName) => this.setState({ value: valueName })}
          renderMenu={(children) => (
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px", maxWidth: "160px" }}
              navbarScroll
            >
              {children}
            </Nav>
          )}
          renderItem={(item, isHighlighted) => (
            <div className={`item ${isHighlighted ? "item-highlighted" : ""}`}>
              {item.name}
            </div>
          )}
        />
        <br />
        <br />

        <label>Director </label>
        <br />
        <Autocomplete
          value={this.state.valueDir}
          inputProps={{ id: "director" }}
          wrapperStyle={{
            position: "relative",
            display: "inline-block",
          }}
          items={this.state.jsonDirector}
          getItemValue={(item) => item.name}
          shouldItemRender={getAni.matchDirector}
          onChange={(event, value) => this.setState({ valueDir: value })}
          onSelect={(value) => this.setState({ valueDir: value })}
          renderMenu={(children) => (
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px", maxWidth: "160px" }}
              navbarScroll
            >
              {children}
            </Nav>
          )}
          renderItem={(item, isHighlighted) => (
            <div className={`item ${isHighlighted ? "item-highlighted" : ""}`}>
              {item.name}
            </div>
          )}
        />
        </div>
        <br />
        <br />


        <label>Release date </label>
        <br />
        From <input type="date" id="dateFrom" name="dateFrom" /> to{" "}
        <input type="date" id="dateTo" name="dateTo" />
        <br />
        <button id="button_search" onClick={this.handleSearchButton}>
          Search
        </button>
      </React.Fragment>
    );
  }
}

export default ComponentBar;
