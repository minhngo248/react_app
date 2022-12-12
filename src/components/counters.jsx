import React, { Component } from 'react';
import axios from 'axios';
import ComponentForm from './componentForm';

class Counters extends Component {
    state = { 
        jsonData: Object()
    }
    
    componentDidMount() {
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
    }

    render() { 
        const jsonAnime = this.state.jsonData;
        var arrAnime = [];
        for (var i in jsonAnime) {
            arrAnime.push(jsonAnime[i]);
        }
        return (
            <React.Fragment>
                <ComponentForm />
                <span id='info_anime'></span>
            </React.Fragment>
        );
    }
}

export default Counters;