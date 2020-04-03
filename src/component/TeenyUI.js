import React, { Component } from "react";
import '../vendor/bootstrap/css/bootstrap.min.css';
import '../vendor/animate/animate.css';
import '../vendor/css-hamburgers/hamburgers.min.css';
import '../vendor/animsition/css/animsition.min.css';
import '../vendor/select2/select2.min.css';
import '../vendor/daterangepicker/daterangepicker.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../fonts/iconic/css/material-design-iconic-font.min.css';
import '../css/util.css';
import '../css/main.css';
import BackgroundImage from '../images/bg-01.jpg'
import ReactCardFlip from 'react-card-flip';
import TeenyUIBack from "./TeenyUIBack";
import TeenyUIFront from "./TeenyUIFront";

class TeenyUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teenyUrl: "",
            isFlipped: false
        };

        this.handleFlipCard = this.handleFlipCard.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createTeeny = this.createTeeny.bind(this);
    }

    handleFlipCard() {
        this.setState({ isFlipped: !this.state.isFlipped });
    }

    handleFormSubmit(url) {
        this.createTeeny(url);
    }

    createTeeny(url) {
        let baseUrl = window.location.origin.toString();
        let data = {};
        data["url"] = url;
        fetch('https://api.teeny.sppk.in/teeny/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            this.handleFlipCard();
            this.setState({
                teenyUrl: baseUrl + '/' + data.teenyUrl
            })
        })
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100" style={{ backgroundImage: "url(" + BackgroundImage + ")" }}>
                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                        <TeenyUIFront
                            formSubmit={this.handleFormSubmit}
                        />

                        <TeenyUIBack
                            teenyUrl={this.state.teenyUrl}
                            flipCard={this.handleFlipCard}
                        />
                    </ReactCardFlip>
                </div>
            </div>
        );
    }
}

export default TeenyUI;
