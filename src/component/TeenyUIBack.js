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
import teenyIco from '../images/teeny.ico'
import { CopyToClipboard } from 'react-copy-to-clipboard';

class TeenyUIBack extends Component {

    constructor(props) {
        super(props);

        this.state = {
            copyUrlText: 'Copy Url'
        };

        this.onCopyToClipboard = this.onCopyToClipboard.bind(this);
    }

    onCopyToClipboard() {

        this.setState({
            copyUrlText: 'Copied'
        });
    }

    render() {
        return (
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <div className="login100-form">
                    <span className="login100-form-title p-b-49">
                        <img src={teenyIco} alt='' />
                    </span>
                    <CopyToClipboard
                        onCopy={this.onCopyToClipboard}
                        text={this.props.teenyUrl}
                    >
                        <div className="wrap-input100 m-b-23 copy-url"
                            copy-url={this.state.copyUrlText}>
                            <span className="label-input100">Teeny Url</span>
                            {/*  → */}
                            <span className="focus-input100" data-symbol="→" />
                            <input
                                className="input100"
                                type="text"
                                name="url"
                                value={this.props.teenyUrl}
                                readOnly
                            />
                        </div>
                    </CopyToClipboard>
                    <div className="text-right p-t-8 p-b-31">
                    </div>
                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn" />
                            <button onClick={this.props.flipCard} className="login100-form-btn">
                                Convert Another URL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeenyUIBack;