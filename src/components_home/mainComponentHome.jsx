import React, { Component } from 'react';
import ComponentBar from './componentBar';

class MainComponentHome extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      jsonData: Object()
    }
  }
    
    /*componentDidMount() {
        axios({
            url: "https://expressminhapp.azurewebsites.net/api/animes",
            method: 'GET'
        })
        .then(
          response => {
            this.setState({
              jsonData: response.data
            });
          },
          error => {
            console.log(error);
          }
        );
    }*/

    render() { 
        return (
            <React.Fragment>
                <ComponentBar />
                <span id='info_anime'></span>
            </React.Fragment>
        );
    }
}

export default MainComponentHome;