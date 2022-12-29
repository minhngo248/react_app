import axios from "axios";
import React, { Component } from "react";
import UpperSearchBarComponent from "../upperSearchBarComponent";
import ComponentDropDown from "./componentDropDown";

class ComponentRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: Object(),
    };
    this._mounted = false;
  }

  componentDidMount() {
    if (this._mounted) return;
    const elemTitle = document.getElementById("page_title");
    elemTitle.innerHTML = "Top rating";
    var url = `https://expressminhapp.azurewebsites.net/api/topRating`;
    axios.get(url).then(
      (response) => {
        this.setState({
          jsonData: response.data,
        });
        var topRate = {};
        for (var i in response.data) {
          var point = String(response.data[i].ratings.value);
          var pointArr = point.split(",");
          
          var sum = 0;
          for (var j = 0; j < pointArr.length; j++) {
            var pointMarked = 0;
            if (pointArr[j].includes("%")) {
              pointMarked = parseFloat(pointArr[j]) / 100;
            } else if (pointArr[j].includes("/")) {
              var poArr = pointArr[j].split("/");
              pointMarked = Number(poArr[0]) / Number(poArr[1]);
            } else {
              pointMarked = 0.8;
            }
            sum += pointMarked / pointArr.length;
          }
          var arrKey = [
            response.data[i].item.value,
            response.data[i].itemLabel.value,
          ];
          topRate[sum] = arrKey;
        }
        const sortedTopRate = Object.keys(topRate)
          .sort((a, b) => b - a)
          .reduce((accumulator, key) => {
            accumulator[key] = topRate[key];
            return accumulator;
          }, {});
        var comp = 1; 
        for (var key in sortedTopRate) {
            const elemBodyTab = document.getElementById("body_rating");
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
            elemTdRate.innerHTML = key;
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

        <h3 className="text-center">Table of rating</h3>
        <p className="text-center font-italic">(From source of Metacritics, RottenTomato ...)</p>
        <ComponentDropDown />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody className="table-group-divider" id="body_rating">


          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ComponentRating;
