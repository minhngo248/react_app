import React, { Component } from "react";
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
      </React.Fragment>
    );
  }
}

export default MainComponentHome;
