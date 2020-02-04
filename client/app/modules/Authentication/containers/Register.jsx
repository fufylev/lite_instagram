import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppStores from '~/modules/Authentication/components/AppStores.jsx';
import InstagramLogo from '~/libs/components/InstagramLogo/InstagramLogo.jsx';
import PhonePicture from '~/modules/Authentication/components/PhonePicture.jsx';
import SingIn from '~/modules/Authentication/components/SingUpLogIn.jsx';
import { register } from '~/actions/authentication';
import { Redirect } from 'react-router-dom';
import Input from '~/modules/Authentication/components/Input';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onChangeHandler = (event) => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
        });

    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(register(this.state));
    };

    render() {
        const { error, isRegistered } = this.props;
        const { email, password } = this.state;

        return (
            <div className="register">
                {isRegistered && <Redirect to="/auth"/>}
                <PhonePicture/>
                <div className="register-form">
                    <div className="top">
                        <InstagramLogo/>
                        <h3>Sign up to see photos and videos from your friends.</h3>
                        <form onSubmit={this.handleSubmit}>
                            <Input onChange={this.onChangeHandler} name='email' value={email}/>
                            <Input onChange={this.onChangeHandler} name='password' value={password}/>
                            {error && <div className="error">{error}</div>}
                            <button className="form-submit"
                                type="submit"
                                onClick={() => this.handleSubmit}>Sing up
                            </button>
                        </form>
                    </div>
                    <SingIn data={{
                        text:'Have an account?',
                        path: '/auth',
                        action: 'Log in'
                    }}/>
                    <p className="app">Get the app.</p>
                    <br/>
                    <AppStores/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.authentication };
}

export default connect(mapStateToProps)(Register);