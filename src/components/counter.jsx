import React, { Component } from 'react';
import axios from 'axios';

class Counter extends Component {
    state = {
        count: 0,
    };

//    constructor() {
//        super();
//        this.handleIncrement = this.handleIncrement.bind(this);
//    }

    handleIncrement = () => {
        console.log("Button clicked", this);
        this.setState({ count: this.state.count + 1 });
    }

    render() { 
        return ( 
            <div>
                <span>{this.state.count}</span>
                <button onClick={this.handleIncrement}>Increment</button>
            </div>
        );
    }

}
 
export default Counter;