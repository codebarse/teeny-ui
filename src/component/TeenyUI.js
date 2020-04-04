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
            isFlipped: false,
            longUrl: "",
            submitButtonHidden: false
        };

        this.handleFlipCard = this.handleFlipCard.bind(this);
        this.setUrls = this.setUrls.bind(this);
        this.submitButtonHiddenToggle = this.submitButtonHiddenToggle.bind(this);
    }

    handleFlipCard() {
        this.setState({ isFlipped: !this.state.isFlipped });
    }

    setUrls(longUrl, teenyUrl) {
        this.setState({
            longUrl: longUrl,
            teenyUrl: teenyUrl
        });
    }

    submitButtonHiddenToggle() {
        this.setState({ submitButtonHidden: !this.state.submitButtonHidden });
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100" style={{ backgroundImage: "url(" + BackgroundImage + ")" }}>
                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                        <TeenyUIFront
                            formSubmit={this.handleFormSubmit}
                            flipCard={this.handleFlipCard}
                            setUrls={this.setUrls}
                            submitButtonHidden={this.state.submitButtonHidden}
                            submitButtonHiddenToggle={this.submitButtonHiddenToggle}
                        />

                        <TeenyUIBack
                            longUrl={this.state.longUrl}
                            teenyUrl={this.state.teenyUrl}
                            flipCard={this.handleFlipCard}
                            submitButtonHiddenToggle={this.submitButtonHiddenToggle}
                        />
                    </ReactCardFlip>
                </div>
            </div>
        );
    }
}

export default TeenyUI;
