import React, { Component } from "react";

class TeenyRedirect extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            url: ""
        };
    }

    componentDidMount() {
        fetch('http://34.71.57.140:43256/teeny/' + this.props.id).then(result => {
            return result.json();
        }).then(data => {
            window.location.replace(data.url);
        })
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default TeenyRedirect;