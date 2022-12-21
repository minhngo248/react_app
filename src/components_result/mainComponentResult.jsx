import React, { Component } from 'react';
import ComponentBar from '../components_home/componentBar';

class MainComponentResult extends Component {
    constructor(props) {
        super(props); 
        this.state = {
        }
    }

    render() { 
        return (
            <React.Fragment>
                <ComponentBar />
                <h1>This is the result</h1>
            </React.Fragment>
        );
    }
}

export default MainComponentResult;