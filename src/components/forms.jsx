import { useEffect, useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import {
    auth,
    loginUser,
    registerUser
} from "../config/firebase"
import { Telegram } from "@mui/icons-material"
import { useAuthState } from "react-firebase-hooks/auth"
import './forms.css'

const Form = ({ regOrLogin }) => {
    const navigate = useNavigate()

    const [user, isLoading] = useAuthState(auth)

    const [credential, setCredential] = useState({
        email: "",
        password: "",
    })

    const emailOnChangeHandler = (e) => {
        setCredential({
            ...credential,
            email: e.target.value,
        })
    }

    const passOnChangeHandler = (e) => {
        setCredential({
            ...credential,
            password: e.target.value,
        })
    }

    const loginHandler = () => {
        loginUser(credential.email, credential.password)
    }

    const registerHandler = () => {
        registerUser(credential.email, credential.password)
    }

    const submitHandler = () => {
        regOrLogin === "login" ? loginHandler() : registerHandler()
    }

    useEffect(
        () => {
            if (user) {
                navigate("/")
            }
            if (isLoading) {
                return
            }
        },
        [user, isLoading, navigate]
    )

    return (
        <>
            <div id="bg"></div>
            <div id="fg">
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                    <Box component="form" sx={{ width: '300px' }}>
                    <Typography variant="h4" sx={{ mb: "1.5rem", color: 'white', width: '100%' }}>Please {regOrLogin === "login" ? "Login" : "register"}</Typography>
                        <TextField InputLabelProps={{ style: {color: '#AF0710', fontWeight: 'bold'} }} size="small" onChange={emailOnChangeHandler} id="email" type="email" variant="outlined" label="Email" inputProps={{ style: {color: '#AF0710'} }} />
                        <TextField InputLabelProps={{ style: {color: '#AF0710', fontWeight: 'bold'} }} size="small" onChange={passOnChangeHandler} id="password" type="password" variant="outlined" label="Password"  sx={{ margin: '1rem 0 1.5rem' }} inputProps={{ style: {color: '#AF0710'} }} />
                        <br />
                        <Button onClick={submitHandler} variant="contained" endIcon={<Telegram />}>{regOrLogin === "login" ? "Login" : "Register"}</Button>
                        <Typography sx={{ mt: "1rem" }}> Or {regOrLogin === "login" ? <Link to="/register">Register</Link> : <Link to="/login">Login</Link>}</Typography>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default Form