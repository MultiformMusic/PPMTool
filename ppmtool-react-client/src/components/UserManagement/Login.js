import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import { login } from '../../actions/SecurityActions';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errors: {}
        }
    }

    componentDidMount() {
        
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.security.validToken) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit = event => {

        event.preventDefault();

        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.login(LoginRequest);
    }

    render() {

        const {errors} = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        value={this.state.username}
                                        onChange={this.onChange}
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        }) }
                                        placeholder="Email Address" 
                                        name="username" />
                                        { errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>
                                <div className="form-group">
                                    <input 
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        type="password" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        }) }
                                        placeholder="Password" 
                                        name="password" />
                                        { errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
});


export default connect(mapStateToProps, {login})(Login);