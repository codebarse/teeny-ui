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

class TeenyUIBack extends Component {

    render() {
        return (
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <div className="login100-form">
                    <span className="login100-form-title p-b-49">
                        Teeny
                    </span>
                    <div className="wrap-input100 m-b-23">
                        <span className="label-input100">Teeny URL</span>
                        <input className="input100" type="text" name="url" value={this.props.teenyUrl} readOnly />
                        <span className="focus-input100" data-symbol="" />
                    </div>
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