import React, { Component } from "react";
import axios from "axios";
import ComponentBar from "../components_home/componentBar";

class MainComponentResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: Object(),
    };
  }

  componentDidMount() {
    let params = new URLSearchParams(this.props.location.search);
    var idAnime = params.get("idAnime");
    const url = `https://expressminhapp.azurewebsites.net/api/result/${idAnime}`;
    axios.get(url)
    .then(
      (response) => {
        this.setState({
          jsonData: response.data
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <h1>This is the result</h1>
      </React.Fragment>
    );
  }
}

export default MainComponentResult;
