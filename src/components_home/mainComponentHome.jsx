import React, { Component } from "react";
import CarouselBoxOffComponent from "./carouselBoxOffComponent";
import CarouselComponent from "./carouselComponent";
import ComponentBar from "./componentBar";

class MainComponentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.style_rating = {
      display: 'inline-block',
      float: 'left'
    }
    this.style_box = {
      display: 'inline-block',
      float: 'right'
    }
  }

  render() {
    return (
      <React.Fragment>
        <ComponentBar />

        <div id="carousel_rating" style={this.style_rating}>
        <h4>Top film by rating</h4>
        <CarouselComponent />
        </div>

        <div id="carousel_box" style={this.style_box}>
        <h4>Top film by box office</h4>
        <CarouselBoxOffComponent />
        </div>
      </React.Fragment>
    );
  }
}

export default MainComponentHome;
