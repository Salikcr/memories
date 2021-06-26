import React,{useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './Icon';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signin,signup} from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

    const classes = useStyles();
    // const isSignUp = true;
    const history = useHistory();
    const [showPassword,setShowPassword] = useState(false);
    const [isSignUp,setIsSignup] = useState(false);
    const [formData,setFormData] = useState(initialState);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp){
            dispatch(signup(formData,history));
        }
        else {
            dispatch(signin(formData,history));

        }
    };

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value})
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj; // ?  for not if not getting res 
        const token = res?.tokenId;

        try {
            dispatch({type:"AUTH",data : {result,token}});
            history.push('/');
        }
        catch(error){
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google sign in was un successfull");
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    return (
        <Container component = "main" maxWidth = "xs">
            <Paper className  = {classes.paper} elevation = {3}>
                <Avatar className = {classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant = "h5">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className = {classes.form} onSubmit = {handleSubmit}>
                    <Grid container spacing = {2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name = "firstName" label = "First Name" handleChange = {handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />                                
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp &&  <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            { isSignUp ? 'Sign Up' : 'Sign In' }
                        </Button>
                        <GoogleLogin 
                            clientId = "540575146666-pe6a7iamnd3igkm8u93a31sgd69m1jac.apps.googleusercontent.com"
                            render = {(renderProps) => (
                                <Button className = {classes.googleButton} color = "primary" fullWidth onClick = {renderProps.onClick} disabled = {renderProps.disabled} startIcon = {<Icon/>} variant = "contained">
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </form>
            </Paper>
        </Container>
    )
}


export default Auth;