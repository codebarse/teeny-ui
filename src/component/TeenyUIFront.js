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
import { isWebUri } from 'valid-url';
import teenyIco from '../images/teeny.ico'
import ParticleEffectButton from 'react-particle-effect-button'

const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;
const HTTP = 'http://';
const HTTPS = 'https://';
const HAS_VAL_CLASS = 'has-val';
const ALERT_VALIDATE_CLASS = 'alert-validate';

class TeenyUIFront extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: '',
            hasVal: '',
            alertValidate: '',
            teenyUrl: '',
            originalUrl: '',
        };
        this.onUrlInputChange = this.onUrlInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createTeeny = this.createTeeny.bind(this);
    }

    onInputBlur() {
        if (this.state.url.trim() !== "") {
            this.setState({ hasVal: HAS_VAL_CLASS });
        }
        else {
            this.setState({ hasVal: '' });
        }
    }

    onInputFocus() {
        //hide validate
        this.setState({ alertValidate: '' });
    }

    onUrlInputChange(event) {
        this.setState({
            url: event.target.value,
            alertValidate: ''
        });
    }

    onFormSubmit(event) {
        event.preventDefault();
        let url = this.state.url.trim();
        let originalUrl = url;
        if (url.match(URL_REGEX) && !url.startsWith(HTTP) && !url.startsWith(HTTPS)) {
            url = HTTP + url;
        }
        if (isWebUri(url)) {
            this.handleFormSubmit(url, originalUrl);
        }
        else {
            //show validate
            this.setState({ alertValidate: ALERT_VALIDATE_CLASS });
        }
    }

    handleFormSubmit(url, originalUrl) {
        this.setState({
            originalUrl: originalUrl,
        });
        this.props.submitButtonHiddenToggle();
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
            this.setState({
                teenyUrl: baseUrl.replace(/(^\w+:|^)\/\//, '') + '/' + data.teenyUrl,
                url: ''
            })
            this.props.setUrls(this.state.originalUrl, this.state.teenyUrl)
            this.props.flipCard();
        })
    }

    render() {
        return (
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <form className="login100-form validate-form" onSubmit={this.onFormSubmit}>
                    <span className="login100-form-title p-b-49">
                        {/* Teeny Url */}
                        <img src={teenyIco} alt='' />
                    </span>
                    <div
                        className={`wrap-input100 validate-input m-b-23 ${this.state.alertValidate}`}
                        data-validate="Invalid Url"
                    >
                        <span className="label-input100">Long Url</span>
                        {/* 🔗 ⮕*/}
                        <span className="focus-input100" data-symbol='→' />
                        <input
                            className={`input100 ${this.state.hasVal}`}
                            type="text"
                            name="url"
                            placeholder="Enter URL"
                            onFocus={this.onInputFocus}
                            value={this.state.url}
                            onChange={this.onUrlInputChange}
                            onBlur={this.onInputBlur}
                        />
                    </div>
                    <div className="text-right p-t-8 p-b-31">
                    </div>

                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn" />

                            <button className="login100-form-btn">
                                <ParticleEffectButton
                                    color='#FFFFFF'
                                    hidden={this.props.submitButtonHidden}
                                    type='rectangle'
                                    duration={500}
                                    particlesAmountCoefficient={5}
                                    // onComplete={() => { this.setState({ submitButtonHidden: false }); }}
                                >
                                    Convert
                                </ParticleEffectButton>
                            </button>

                        </div>
                    </div>
                    {/* </ParticleEffectButton> */}
                </form>
            </div>
        );
    }
}

export default TeenyUIFront;
