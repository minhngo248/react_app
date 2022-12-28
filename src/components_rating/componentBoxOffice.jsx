import axios from "axios";
import React, { Component } from "react";
import UpperSearchBarComponent from "../upperSearchBarComponent";
import ComponentDropDown from "./componentDropDown";

class ComponentBoxOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: Object(),
    };
    this._mounted = false;
  }

  componentDidMount() {
    if (this._mounted) return;
    var url = `https://expressminhapp.azurewebsites.net/api/topBoxOffice`;
    axios.get(url).then(
      (response) => {
        this.setState({
          jsonData: response.data,
        });
        var topRate = {};
        for (var i in response.data) {
          var box = parseInt(response.data[i].boxOffice.value);
          var arrKey = [
            response.data[i].item.value,
            response.data[i].itemLabel.value,
          ];
          topRate[box] = arrKey;
        }       
        const sortedTopRate = Object.keys(topRate)
          .sort((a, b) => (b - a))
          .reduce((accumulator, key) => {
            accumulator[key] = topRate[key];
            return accumulator;
          }, {});
        var comp = 1; 
        for (var key in sortedTopRate) {
            const elemBodyTab = document.getElementById("body_box");
            const elemTr = document.createElement("tr");
            const elemTh = document.createElement("th");
            elemTh.setAttribute("scope", "row");
            elemTh.innerHTML = comp;
            const elemTdName = document.createElement("td");
            const elemA = document.createElement('a');
            elemA.setAttribute("href", "/result?idAnime=Q" + sortedTopRate[key][0].split('Q')[1]);
            elemA.innerHTML = sortedTopRate[key][1];
            elemTdName.appendChild(elemA);
            const elemTdRate = document.createElement("td");
            elemTdRate.innerHTML = Number(key).toLocaleString('en-US');
            elemTr.appendChild(elemTh);
            elemTr.appendChild(elemTdName);
            elemTr.appendChild(elemTdRate);
            elemBodyTab.appendChild(elemTr);
            comp++;
        }
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

        <h3 className="text-center">Top box office</h3>
        <p className="text-center font-italic">(From source of Mojo)</p>
        <ComponentDropDown />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Box office (US dollar)</th>
            </tr>
          </thead>
          <tbody className="table-group-divider" id="body_box">


          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ComponentBoxOffice;
