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

const COPY_URL = 'Copy Url';

class TeenyUIBack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            copyTeenyUrlText: COPY_URL
        };

        this.onCopyTeenyUrlToClipboard = this.onCopyTeenyUrlToClipboard.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    onCopyTeenyUrlToClipboard() {
        this.setState({
            copyTeenyUrlText: 'Copied'
        });
    }

    handleClick() {
        this.props.flipCard();
        this.props.submitButtonHiddenToggle();
    }

    render() {
        return (
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <div className="login100-form">
                    <span className="login100-form-title p-b-49">
                        <img src={teenyIco} alt='' />
                    </span>
                    <CopyToClipboard
                        onCopy={this.onCopyTeenyUrlToClipboard}
                        text={this.props.teenyUrl}
                    >
                        <div className="wrap-input100 m-b-23 copy-url" onMouseLeave={() => { this.setState({ copyTeenyUrlText: COPY_URL }) }}
                            copy-url={this.state.copyTeenyUrlText}>
                            <span className="label-input100">Teeny Url - {this.props.teenyUrl.length} characters</span>
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
                    <div className="wrap-input100-2 m-b-23">
                        <span className="label-input100-2">Long Url - {this.props.longUrl.length} characters</span>
                        {/*  → */}
                        <span className="focus-input100" data-symbol="→" />
                        <input
                            className="input100-2"
                            type="text"
                            name="url"
                            value={this.props.longUrl}
                            readOnly
                        />
                    </div>
                    {/* <div className="text-right p-t-8 p-b-31">
                    </div> */}
                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn" />
                            <button onClick={this.handleClick} className="login100-form-btn">
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