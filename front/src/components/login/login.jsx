import React, {Component} from 'react';
import './login.styles.css';
import logo from './travelbloglogo.png';
import { message } from 'antd';

class Login extends Component {
    constructor(props) {
        super(props); 
        this.state= {
            email: '',
            password: '',
        }
    }
    onSubmitConfirmation = () => {
         fetch('https://dry-ravine-65913-bf22e3189720.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(response => response.json())
        .then(data => {
            if (data !== 'wrong credentials' && data !== 'unable to get user'){
                message.success('Authentication Successful');
                this.props.updateUser(data); // Call the updateUser function via props
                setTimeout(() => {
                    this.props.onRouteChange('/home');
                }, 1000)
            } else {
                return alert('Authentication Unsuccessful')
            }
        })

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
    onRegister = () => {
        this.props.onRouteChange('/register')
    }
    render() {

        return (
            <div>
            <div className="sign-in-page">
                <div className="filler"></div>  
                <form onSubmit ={(e) => this.handleSubmit(e)} required autoComplete='on'>
                <div className = "login-page">
                    <img className="image-logo"src={logo} alt="logo"/>
                    <div className="sign-in">
                        <h2 className="sign-h">Sign In</h2>
                    </div>
                    <div className = "email">
                        <h1 className ="emails">Email Address</h1>
                        <input
                        autoComplete='on'
                        onChange = {(e) => {
                            this.onEmailChange(e);
                        }}
                        className="input-email"
                        type="text"
                        required/>
                    </div>
                    <div className = "password">
                        <h1 className="password-text">Your Password</h1>
                        <input
                        autoComplete='on'
                        onChange ={(e) => {
                            this.onPasswordChange(e);
                        }}
                        className="input-password"
                        type="password" 
                        required/>    
                    </div>   
                    <div className="submit">
                        <input 
                        onClick = {
                            () => this.onSubmitConfirmation()
                        }
                        type='submit'
                        className="login-button"/>
                    <div className ="final-line">
                        <h1 className="account">Don't have an account?</h1><h1 onClick={() => {this.onRegister()}}className="regi">Register</h1>  
                    </div>
                </div>             
                </div>       
                </form> 
            <div className="filler"></div>
            </div>
            </div>
            
            
        );
    }
}

export default Login;