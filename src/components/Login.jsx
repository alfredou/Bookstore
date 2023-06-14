import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import './login.css'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function Login() {
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validate={(valores) => {
                let errors = {}

                if (!valores.username) {
                    errors.username = 'Please type a username'
                } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)) {
                    errors.username = 'El nombre solo puede contener letras y espacios'
                }

                if (!valores.password) {
                    errors.password = 'Please type a password'
                } else if (!/^.{4,12}$/.test(valores.password)) {
                    errors.password = 'La password debe ser de 4 a 12 digitos'
                }

                return errors
            }}
            onSubmit={(credentials) => {
                dispatch({ type: "LOGIN_START" })
                axios.post("https://bookstore-node-production.up.railway.app/api/auth/login", credentials)
                    .then(res => {
                        dispatch({ type: "LOGIN_SUCESS", payload: res.data })
                        navigate("/bookstore")
                    }).catch((e) => {
                        //console.log(e)
                        dispatch({ type: "LOGIN_FAILURE", payload: e })
                    })
            }}
        >
            {({ errors }) => (

                <Form className="login">
                    <div className="login__container">
                        <label htmlFor="username" className="login__Text">Username</label>
                        <Field
                            type="text"
                            id="username"
                            name="username"
                            className="login__input"
                            placeholder="Jhon Doe" />

                        <ErrorMessage name="username" component={() => (
                            <div className="error">{errors.username}</div>
                        )} />

                    </div>
                    <div className="login__container">
                        <label htmlFor="password" className="login__Text">Password</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            className="login__input"
                            placeholder="Password" />

                        <ErrorMessage name="password" component={() => (
                            <div className="error">{errors.password}</div>
                        )} />
                    </div>
                    <Button type="submit" buttonStyle="btn--blue--medium" buttonSize="btn--large">Login</Button>
                    <NavLink className="login__create" to="/bookstore/register">Create account</NavLink>
                </Form>
            )}

        </Formik >
    )
}

export default Login