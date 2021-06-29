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

const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;
const HTTP = 'http://';
const HTTPS = 'https://';
const HAS_VAL_CLASS = 'has-val';
const ALERT_VALIDATE_CLASS = 'alert-validate';
const CONVERT = 'Convert';
const LOADING = 'Loading...';
const ERROR = 'Error!!! Try-again';
const NAME_ALREADY_EXISTS = 'Name already exists';
const INVALID_NAME = 'Invalid name';
const keyRegex = /^[0-9a-zA-Z]+$/;

class TeenyUIFront extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: '',
            customKey: '',
            hasVal: '',
            alertUrlValidate: '',
            alertCustomKeyValidate: '',
            alertCustomKeyValidateText: NAME_ALREADY_EXISTS,
            teenyUrl: '',
            originalUrl: '',
            submitButtonText: CONVERT
        };
        this.onUrlInputChange = this.onUrlInputChange.bind(this);
        this.onCustomKeyInputChange = this.onCustomKeyInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createTeeny = this.createTeeny.bind(this);
        this.isKeyAvailabile = this.isKeyAvailabile.bind(this);
        this.isValidKey = this.isValidKey.bind(this);
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
        this.setState({ alertUrlValidate: '' });
    }

    onUrlInputChange(event) {
        this.setState({
            url: event.target.value,
            alertUrlValidate: ''
        });
    }

    onCustomKeyInputChange(event) {
        let alert = this.state.alertCustomKeyValidate;
        let key = event.target.value
        let keyPromise = Promise.resolve();
        let alertText = NAME_ALREADY_EXISTS;
        if(event.target.value === '') {
            alert = '';
        } else if(this.isValidKey(key)) {
            keyPromise = this.isKeyAvailabile(key).then( data => {
                if(data === false) {
                    alert = ALERT_VALIDATE_CLASS;
                } else {
                    alert = '';
                }
            });
        } else {
            alert = ALERT_VALIDATE_CLASS;
            alertText = INVALID_NAME;
        }

        Promise.all([keyPromise]).then(() => {
            this.setState({
                customKey: key,
                alertCustomKeyValidate: alert,
                alertCustomKeyValidateText: alertText
            });
        });

    }

    isValidKey(key) {
        return key.match(keyRegex);
    }

    isKeyAvailabile(customKey) {
        return fetch('https://api.teeny.sppk.in/teeny/checkKeyAvailability?customKey=' + customKey).then(response => {
            return response.json();
        }).catch (error => {
            console.error(error);
            return { name: "Network error", description: "Shhhh.... We are now sleeping and dreaming about new features to implement. Will be back soon" };
        });
    }

    onFormSubmit(event) {
        event.preventDefault();
        let url = this.state.url.trim();
        let customKey = this.state.customKey.trim();
        let originalUrl = url;
        if (url.match(URL_REGEX) && !url.startsWith(HTTP) && !url.startsWith(HTTPS)) {
            url = HTTP + url;
        }
        if (isWebUri(url)) {
            this.handleFormSubmit(url, originalUrl, customKey);
        }
        else {
            //show validate
            this.setState({ alertUrlValidate: ALERT_VALIDATE_CLASS });
        }
    }

    handleFormSubmit(url, originalUrl, customKey) {
        this.setState({ 
            originalUrl: originalUrl,
            submitButtonText: LOADING
        });
        this.createTeeny(url, customKey);
    }

    createTeeny(url, customKey) {
        let baseUrl = window.location.origin.toString();
        let data = {};
        data["url"] = url;
        data["customKey"] = customKey;
        fetch('https://api.teeny.sppk.in/teeny/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return Promise.all([res.status, res.json()]);
        }).then(([statusCode, data]) => {
            if (statusCode !== 200) {
                console.log(statusCode);
                this.setState({ 
                    submitButtonText: ERROR
                });
            } else {
                let teenyUrl = baseUrl.replace(/(^\w+:|^)\/\//, '') + '/' + data.teenyUrl;
                this.props.setUrls(this.state.originalUrl, teenyUrl);
                this.props.flipCard();
                this.setState({
                    teenyUrl: teenyUrl,
                    url: '',
                    customKey: '',
                    submitButtonText: CONVERT
                })
            }
        }).catch(error => {
            console.error(error);
            this.setState({ 
                submitButtonText: ERROR
            });
            return { name: "Network error", description: "Shhhh.... We are now sleeping and dreaming about new features to implement. Will be back soon" };
        });
    }

    render() {
        return (
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <form className="login100-form validate-form" onSubmit={this.onFormSubmit}>
                    <span className="login100-form-title p-b-49">
                        <img src={teenyIco} alt='' />
                    </span>
                    <div
                        className={`wrap-input100 validate-input m-b-23 ${this.state.alertUrlValidate}`}
                        data-validate="Invalid Url"
                    >
                        <span className="label-input100">Long Url</span>
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

                    <div
                        className={`wrap-input80 validate-input m-b-23 ${this.state.alertCustomKeyValidate}`}
                        data-validate={this.state.alertCustomKeyValidateText}
                    >
                        <span className="label-input80">Custom Name (Optional)</span>
                        <span className="focus-input80" data-symbol='teeny.sppk.in/' />
                        <input
                            className={`input80 ${this.state.hasVal}`}
                            type="text"
                            name="customKey"
                            placeholder="customName"
                            onFocus={this.onInputFocus}
                            value={this.state.customKey}
                            onChange={this.onCustomKeyInputChange}
                            onBlur={this.onInputBlur}
                        />
                    </div>

                    <div className="text-right p-t-8 p-b-31">
                    </div>
                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn" />
                            <button className="login100-form-btn">
                                {this.state.submitButtonText}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default TeenyUIFront;
