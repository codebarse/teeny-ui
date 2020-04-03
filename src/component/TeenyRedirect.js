import React, { Component } from "react";

class TeenyRedirect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        };
    }

    componentDidMount() {
        fetch('https://api.teeny.sppk.in/teeny/' + this.props.id).then(result => {
            return result.json();
        }).then(data => {
            console.log(data);
            if(data.url !== undefined) {
                window.location.replace(data.url);
            }
        })
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default TeenyRedirect;
