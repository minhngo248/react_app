import axios from "axios";
import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

class CarouselBoxOffComponent extends Component {
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
          var point = parseInt(response.data[i].boxOffice.value);
          var arrKey = [
            response.data[i].item.value,
            response.data[i].itemLabel.value
          ];
          topRate[point] = arrKey;
        }
        const sortedTopRate = Object.keys(topRate)
          .sort((a, b) => b - a)
          .reduce((accumulator, key) => {
            accumulator[key] = topRate[key];
            return accumulator;
          }, {});
        
        var comp = 0;
        for (var key in sortedTopRate) {
            if (comp < Object.keys(sortedTopRate).length - 3) {
                comp++;
                continue;
            }
            const elemNameTop = document.getElementById("box_top_" + String(Object.keys(sortedTopRate).length-comp));
            elemNameTop.innerHTML = sortedTopRate[key][1]; 
            //const elemDirTop = document.getElementById("director_top_"+(Object.keys(sortedTopRate).length-comp));
            //elemDirTop.innerHTML = "Directed by " + sortedTopRate[key][2];
            const elemLinkTop = document.getElementById("box_link_top_"+String(Object.keys(sortedTopRate).length-comp));
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
    return (
      <React.Fragment>
        <Carousel fade className="w-50 p-2">
          <Carousel.Item>
            <a id="box_link_top_1">
            <img
              className="d-block w-100"
              src="https://pbs.twimg.com/profile_images/724903596052103170/8Ri5g8JK.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 id="box_top_1"></h3>
            </Carousel.Caption>
            </a>
          </Carousel.Item>
          
          <Carousel.Item>
            <a id="box_link_top_2">
            <img
              className="d-block w-100"
              src="https://pbs.twimg.com/profile_images/724903596052103170/8Ri5g8JK.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3 id="box_top_2"></h3>
            </Carousel.Caption>
            </a>
          </Carousel.Item>

          <Carousel.Item>
            <a id="box_link_top_3">
            <img
              className="d-block w-100"
              src="https://pbs.twimg.com/profile_images/724903596052103170/8Ri5g8JK.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 id="box_top_3"></h3>
            </Carousel.Caption>
            </a>
          </Carousel.Item>
        </Carousel>
      </React.Fragment>
    );
  }
}

export default CarouselBoxOffComponent;
