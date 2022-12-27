import axios from "axios";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class CarrouselComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: Object(),
    };
    this._mounted = false;
  }

  componentDidMount() {
    if (this._mounted) return;
    var url = `https://expressminhapp.azurewebsites.net/api/topRating`;
    axios.get(url).then(
      (response) => {
        this.setState({
          jsonData: response.data,
        });
        var topRate = {};
        for (var i in response.data) {
          var point = String(response.data[i].ratings.value);
          var pointArr = point.split(", ");
          var sum = 0;
          for (var j = 0; j < pointArr.length; j++) {
            var pointMarked = 0;
            if (pointArr[j].includes("%")) {
              pointMarked = parseFloat(pointArr) / 100;
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
            response.data[i].director.value
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
            if (comp > 3) break;
            const elemNameTop = document.getElementById("name_top_" + comp);
            elemNameTop.innerHTML = sortedTopRate[key][1];
            const elemDirTop = document.getElementById("director_top_"+comp);
            elemDirTop.innerHTML = "Directed by " + sortedTopRate[key][2];
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
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
          <div className="carousel-indicators">
            <button
              typeName="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              typeName="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              typeName="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src="https://d12i7q49526cmu.cloudfront.net/media/original_images/React_Logo.png" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 id="name_top_1"></h5>
                <p id="director_top_1"></p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="https://d12i7q49526cmu.cloudfront.net/media/original_images/React_Logo.png" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 id="name_top_2"></h5>
                <p id="director_top_2"></p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://d12i7q49526cmu.cloudfront.net/media/original_images/React_Logo.png" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 id="name_top_3"></h5>
                <p id="director_top_3"></p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            typeName="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            typeName="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default CarrouselComponent;
