import React, { Component } from 'react';
import axios from 'axios';

class ComponentForm extends Component {
    state = {
        jsonData: Object()
    }

    handleClickButton() {
        const elemInfo = document.getElementById('info_anime');
        const idAnimeInput = document.getElementById('idAnime').value;
        axios({
            url: "https://expressminhapp.azurewebsites.net/api/anime/" + idAnimeInput,
            method: 'GET',
            responseType: 'json'
        })
        .then(
          response => {
            this.setState({
              jsonData: response.data
            })
          },
          error => {
            console.log(error);
          }
        );
        elemInfo.innerHTML = JSON.stringify(this.state.jsonData);
    }

    render() { 
        return (
            <React.Fragment>
            <form>
                <label htmlFor="idAnime">Id Anime:</label><br/>
                <input type="text" id="idAnime" name="idAnime" value="Q21697406"/><br/>
            </form> 
            <button id='button_search' type="submit" onClick={this.handleClickButton}>Submit</button>
            </React.Fragment>
        );
    }
}

export default ComponentForm;