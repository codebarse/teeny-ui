import React, { Component } from "react";
import * as constants from './Constants'

class TeenyRedirect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    componentDidMount() {
        fetch(constants.BACKEND_API + '/teeny/' + this.props.id).then(response => {
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
                this.setState({ text: constants.INVALID_URL_SPAN });
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
