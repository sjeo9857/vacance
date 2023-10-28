import React, {Component} from 'react';
import logo from '..//login/travelbloglogo.png';
import './register.styles.css';
import { message } from 'antd';

class Register extends Component {
    constructor(props) {
        super(props); 
        this.state= {
            email: '',
            password: '',
            username: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    onUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }
    onSubmitConfirmation = () => {
        fetch('http://localhost:2000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.username
            })
        }).then(response => response.json())
        .then(user => {
            if (user === 'incorrect form submission' || user === 'unable to register'){
                return alert('Authentication Unsuccessful')
            } else {
                message.success('Authentication Successful');
                this.props.updateUser(user); // Call the updateUser function via props
                setTimeout(() => {
                    this.props.onRouteChange('/home');
                }, 1000)
            }
        })
    }

    render() {
        return (
            <div>
            <div className="register-page">
                <div className="filler-register"></div>  
                <form onSubmiy = {(e) => this.handleSubmit(e)} required>
                <div className = "register2-page">
                    <img className="image-logo-register"src={logo} alt="logo"/>
                    <div className="register-i">
                        <h2 className="register-h">Register</h2>
                    </div>
                    <div className = "username-register">
                        <h1 className ="username">Username</h1>
                        <input
                        onChange = {(e) => {
                            this.onUsernameChange(e);
                        }}
                        className="input-username-register"
                        type="text"
                        required/>
                    </div>
                    <div className = "email-register">
                        <h1 className ="emails-register">Email Address</h1>
                        <input
                        onChange = {(e) => {
                            this.onEmailChange(e);
                        }}
                        className="input-email-register"
                        type="text"
                        required/>
                        
                    </div>
                    <div className = "password-register">
                        <h1 className="password-text-register">Your Password</h1>
                        <input
                        onChange ={(e) => {
                            this.onPasswordChange(e);
                        }}
                        className="input-password-register"
                        type="password" 
                        required/>    
                    </div>   
                    <div className="submit-register">
                        <input 
                        onClick = {
                            () => this.onSubmitConfirmation()
                        }
                        type='submit'
                        className="register-button"/>
                </div>             
                </div>       
                </form> 
            <div className="filler-register"></div>
            </div>
            </div>
        );
    }
}

export default Register;