import axios from "axios";
import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
class CarouselComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: Object(),
    };
    this._mounted = false;
  }

  componentDidMount() {
    if (this._mounted) return;
    var url = `/api/topRating`;
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
          const elemDirTop = document.getElementById("director_top_" + comp);
          elemDirTop.innerHTML = "Directed by " + sortedTopRate[key][2];
          const elemLinkTop = document.getElementById("link_top_" + comp);
          elemLinkTop.setAttribute("href", "/result?idAnime=Q" + sortedTopRate[key][0].split('Q')[1]);
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
    let styless = {
      "width": "640px",
      "height": "360px",
    }
    return (
      <React.Fragment>
        <Carousel class="myCarousel" fade className="w-75 p-3">
          <Carousel.Item>
            <a id="link_top_1" href="#">
              <img
                object-fit="cover"
                className="d-block w-100"
                src="https://i.imgur.com/xqqLHJc.png"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 id="name_top_1"></h3>
                <p id="director_top_1"></p>
              </Carousel.Caption>
            </a>
          </Carousel.Item>

          <Carousel.Item>
            <a id="link_top_2" href="#">
              <img
                object-fit="cover"
                className="d-block w-100"
                src="https://i.imgur.com/xqqLHJc.png"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3 id="name_top_2"></h3>
                <p id="director_top_2"></p>
              </Carousel.Caption>
            </a>
          </Carousel.Item>

          <Carousel.Item>
            <a id="link_top_3" href="#">
              <img
                object-fit="cover"
                className="d-block w-100"
                src="https://i.imgur.com/xqqLHJc.png"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3 id="name_top_3"></h3>
                <p id="director_top_3"></p>
              </Carousel.Caption>
            </a>
          </Carousel.Item>
        </Carousel>
      </React.Fragment>
    );
  }
}

export default CarouselComponent;
