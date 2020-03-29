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
// import '../js/main.js';

class TeenyUIFront extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: ""
        }
        this.onUrlInputChange = this.onUrlInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputBlur() {

    }

    onUrlInputChange(event) {
        this.setState({ url: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.formSubmit(this.state.url);
    }

    render() {
        return (
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <form className="login100-form validate-form" onSubmit={this.onFormSubmit}>
                    <span className="login100-form-title p-b-49">
                        Teeny
                    </span>
                    <div className="wrap-input100 validate-input m-b-23" data-validate="URL is empty or invalid">
                        <span className="label-input100">UGLY URL</span>
                        <input className="input100" type="text" name="url" placeholder="Enter URL"
                            value={this.state.url}
                            onChange={this.onUrlInputChange}
                            onBlur
                        />
                        <span className="focus-input100" data-symbol="" />
                    </div>
                    <div className="text-right p-t-8 p-b-31">
                    </div>
                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn" />
                            <button className="login100-form-btn">
                                Convert
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default TeenyUIFront;