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
        fetch('https://api.teeny.sppk.in/teeny/' + this.props.id).then(result => {
            // console.log(result);
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
