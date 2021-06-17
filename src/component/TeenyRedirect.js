import React, { Component } from "react";

const INVALID_URL_SPAN = <span>Invalid Url! Return to <a href='https://teeny.sppk.in'>Teeny Homepage</a></span>

class TeenyRedirect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/teeny/' + this.props.id).then(response => {
            const statusCode = response.status;
            if (statusCode === 404) {
                return [404, {}];
            }
            const data = response.json();
            return Promise.all([statusCode, data]);
        }).then(([statusCode, data]) => {
            if (statusCode === 200) {
                window.location.replace(data.url);
            } else {
                this.setState({ text: INVALID_URL_SPAN });
            }
        }).catch(error => {
            console.error(error);
            return { name: "Network error", description: "Shhhh.... We are now sleeping and dreaming about new features to implement. Will be back soon" };
        });
    }

    render() {
        return (
            <div>
                {this.state.text}
            </div>
        );
    }
}

export default TeenyRedirect;
