import React, { Component } from "react";
import CarrouselComponent from "./carrouselComponent";
import ComponentBar from "./componentBar";

class MainComponentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <React.Fragment>
        <ComponentBar />
        <h4>Top film by rating</h4>
        <CarrouselComponent />
      </React.Fragment>
    );
  }
}

export default MainComponentHome;
