import React, { Component } from "react";
import CarouselBoxOffComponent from "./carouselBoxOffComponent";
import CarouselComponent from "./carouselComponent";
import ComponentBar from "./componentBar";

class MainComponentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this._mounted = false;
  }

  componentDidMount() {
    if (this._mounted) return;
    const elemTitle = document.getElementById("page_title");
    elemTitle.innerHTML = "Anifsearch";
    this._mounted = true;
  }

  render() {
    return (
      <React.Fragment>
        <div id="carousel_rating" className="d-block float-left w-75 p-3">
          <CarouselComponent />
        </div>

        <div>
          <ComponentBar />
        </div>
      </React.Fragment>
    );
  }
}

export default MainComponentHome;
