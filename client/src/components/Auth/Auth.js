import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import useStyles from './styles';
import {LockOutlined} from '@material-ui/icons';
import Input from './Input';
import Icon from './Icon'
import { CONFIGS } from '../../constants/configs';

import { googleSignIn, signUp, signIn } from '../../actions/auth';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);

    const [isSignUp, setIsSignUp] = useState(false);

    const swichMode = () => {
        setIsSignUp((prev) => !prev);
        setShowPassword(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isSignUp) {
            dispatch(signUp(formData, history));
        } else {
            dispatch(signIn(formData, history));
        }
    };

    const handleChange = (event) => {
        setFormData({... formData, [event.target.name]: event.target.value});
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const googleSuccess = async (res) => {
        dispatch(googleSignIn(res, history));
    }
    const googleFailure = (error) => {
        console.log(error);
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlined />
            </Avatar>
            <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} autoFocus half />
                            </>
                        )
                    }
                    <Input name='email' label='Email Address' handleChange={handleChange} type="email" />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleTogglePassword={handleTogglePassword} />
                    {
                        isSignUp && 
                        <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleTogglePassword={handleTogglePassword} />
                    }
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                <GoogleLogin
                    clientId={CONFIGS.GOOGLE_CLIENT_ID}
                    render={(renderProps) => (
                        <Button
                            className={classes.googleButton}
                            color='primary'
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon />}
                            variant='contained'>
                                Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={swichMode}>
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth