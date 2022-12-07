import React, { Component } from 'react';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';

class Counter extends Component {
    state = {
        count: 0,
        apiResponse: ""
    };

//    constructor() {
//        super();
//        this.handleIncrement = this.handleIncrement.bind(this);
//    }

    componentDidMount() {
        axios.get("http://localhost:3010/api/films").then(
          result => {
            this.setState({
              apiResponse: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          error => {
            console.log(error);
          }
        );
      }

    handleIncrement = () => {
        console.log("Button clicked", this);
        this.setState({ count: this.state.count + 1 });
    }

    render() { 
        const dat = this.state.apiResponse.data;
        return ( 
            <React.Fragment>
                <span>{this.state.count}</span>
                <button onClick={this.handleIncrement}>Increment</button>
                <span>{JSON.stringify(dat)}</span>
            </React.Fragment>
        );
    }

}
 
export default Counter;