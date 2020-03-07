import React, { Component } from "react";
import ReactDOM from "react-dom";

class TeenyUI extends Component {
    constructor() {
        super();

        this.state = {
            value: ""
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/teeny/1').then(result => {
            return result.json();
        }).then(data => {
            this.setState({
                value: data.url
            })
            console.log(data);
        })
    }

    handleChange() {

    }

    render() {
        return ( < div > { this.state.value } <
            /div>
        );
    }
}

export default TeenyUI;